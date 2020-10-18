/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const testUserID = 3;
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  const dbHelpers = require('../db/dbHelpers')(db);
  router.get("/", (req, res) => {
    const loadedMaps = [];
    dbHelpers.loadAllMaps()
      .then(maps => {
        for (const map of maps) {
          const mapStaticURL = dbHelpers.buildStaticURL(map.center_latitude, map.center_longitude, 6, 250, 250, "AIzaSyAzhpPYg-ucwzqHgAPqZfYbXVnmsMazg2I");
          loadedMaps.push({ mapStaticURL, title: map.title, description: map.description });
        }
        const templateVars = { loadedMaps };
        res.render("maps", templateVars);
      }).catch(err => console.log(err));
  });

  router.get("/", (req, res) => {
    let query = `SELECT * FROM maps`;
    console.log(query);
    db.query(query)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/new', (req, res) => {
    const defaultFrame = dbHelpers.fetchLatlngByIP();
    console.log(defaultFrame);
    const templateVars = {
      defaultFrame
    };
    return res.render('create_map', templateVars);
  });

  router.post('/', (req, res) => {
    console.log(req.body);
    const datajson = req.body;
    const dateCreated = datajson.date_created;
    const mapTitle = datajson.map_title;
    const mapDesc = datajson.map_desc;
    delete datajson.date_created;
    delete datajson.map_title;
    delete datajson.map_desc;
    console.log(datajson);
    const locObj = dbHelpers.createLocationsArray(datajson);
    locObj.dateCreated = dateCreated;
    locObj.mapTitle = mapTitle;
    locObj.mapDesc = mapDesc;
    // console.log(locObj);
    const query = `INSERT INTO maps (title, description, owner_id, date_created)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`;
    db.query(query, [locObj.mapTitle, locObj.mapDesc
      , testUserID, locObj.dateCreated])
      .then(res1 => {
        console.log(res1.rows[0]);
        const query2 = `INSERT INTO markers (map_id, latitude, longitude, title, description, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;
        for (const i in locObj.lat) {
          const queryParams = [res1.rows[0].id, locObj.lat[i]
            , locObj.lng[i], locObj.title[i], locObj.desc[i], locObj.img[i]];
          db.query(query2, queryParams).catch(err => console.log(err));
        }
        // console.log(res.rows);
        return res.status(200).json({ url: `/maps/${res1.rows[0].id}` });
      }).catch(err1 => console.log(err1));
  });

  router.get('/:id', (req, res) => {
    const templateVars = {};
    return res.render('edit_map', templateVars);
  });

  return router;
};
