/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  const dbHelpers = require('../db/dbHelpers')(db);
  router.get("/", (req, res) => {
    dbHelpers.loadAllMapMarkers()
    .then(markers => {
      const loadedMaps = dbHelpers.convertMapMarkersToMapArray(markers);
      if (req.session.userId) {
        dbHelpers.getUserById(req.session.userId)
        .then(user => {
          return res.render("maps", { loadedMaps, username: user.username, userId: user.id, active: "maps" });
        });
      } else {
        return res.render("maps", { loadedMaps, username: null, userId: null, active: "maps" });
      }
    }); 
  });

  router.get('/new', (req, res) => {
    dbHelpers.getUserById(req.session.userId)
      .then(user => {
        const templateVars = { username: user.username, userId: user.id, active: "new-map" };
        return res.status(200).render('create_map', templateVars);
      });

  });

  router.post('/', (req, res) => {
    // console.log(req.body, 'here');
    if (req.body.hasOwnProperty('map_error')) return res.status(400).json({ error: 'Map Title field cannot be empty!' });
    if (req.body.hasOwnProperty('mark_error')) return res.status(400).json({ error: 'Marker Title field cannot be empty!' });
    const datajson = req.body;
    const dateCreated = datajson.date_created;
    const mapTitle = datajson.map_title;
    const mapDesc = datajson.map_desc;
    delete datajson.date_created;
    delete datajson.map_title;
    delete datajson.map_desc;
    // console.log(datajson);
    const locObj = dbHelpers.createLocationsArray(datajson);
    locObj.dateCreated = dateCreated;
    locObj.mapTitle = mapTitle;
    locObj.mapDesc = mapDesc;
    console.log(locObj, 'loc');
    // console.log(locObj);
    const query = `INSERT INTO maps (title, description, owner_id, date_created)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`;
    db.query(query, [locObj.mapTitle, locObj.mapDesc
      , req.session.userId, locObj.dateCreated])
      .then(res1 => {
        // console.log(res1.rows[0]);
        if (locObj.lat) {
          const query2 = `INSERT INTO markers (map_id, latitude, longitude, title, description, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;
          for (const i in locObj.lat) {
            const imgElement = locObj.img[i];
            const queryParams = [res1.rows[0].id, locObj.lat[i]
              , locObj.lng[i], locObj.title[i], locObj.desc[i], imgElement];
            db.query(query2, queryParams).catch(err => console.log(err));
          }
        }
        const queryContrib = `INSERT INTO contributors
        (map_id, user_id) VALUES ($1, $2)
        RETURNING *;`;
        db.query(queryContrib, [res1.rows[0].id, req.session.userId])
          .catch(er => console.log(er));
        // console.log(res.rows);
        return res.status(200).json({ url: `/maps/${res1.rows[0].id}` });
      }).catch(err1 => console.log(err1));
  });

  router.get('/:id', (req, res) => {
    if (!req.session.userId) {
      return res.render('edit_map', { username: null, userId: null, active: null });
    }
    dbHelpers.getUserById(req.session.userId)
      .then(user => {
        return dbHelpers.userIsOwner(user.id, req.params.id)
          .then(data => {
            // console.log(data);
            let templateVars;
            if (data.length) templateVars = { username: user.username, userId: user.id, active: null, isOwner: true };
            else templateVars = { username: user.username, userId: user.id, active: null, isOwner: false };
            return res.render('edit_map', templateVars);
          }).catch(er => console.log(er));
      }).catch(er => console.log(er));

  });

  return router;
};
