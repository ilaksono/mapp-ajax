const express = require('express');
const router = express.Router();

module.exports = (db) => {
  const dbHelpers = require('../db/dbHelpers')(db);

  router.get('/:id', (req, res) => {
    const query = `
    SELECT markers.id, latitude, longitude, markers.title, markers.description
    ,image_url,maps.title as maps_title, maps.description as maps_description, users.username 
    FROM markers JOIN maps ON (map_id = maps.id)
    JOIN users ON (owner_id = users.id) 
    WHERE map_id = $1 AND markers.deleted = false;`;
    return db.query(query, [Number(req.params.id)])
      .then(data => {
        // console.log(data.rows);
        return res.json(data.rows);
      })
      .catch(err => console.log(err));
  });
  router.put('/:id', (req, res) => {
    console.log(req.body, 'req');
    const dataJson = req.body;
    let delArr = dataJson.deleted.split(',');
    if (delArr[0] === '')
      delArr = [];
    // console.log(delArr.length);
    const ogLen = Number(dataJson.og_len);
    const mapTitle = dataJson.map_title;
    const mapDesc = dataJson.map_desc;
    // console.log(delArr);
    delete dataJson.deleted;
    delete dataJson.og_len;
    delete dataJson.map_title;
    delete dataJson.map_desc;
    console.log(dataJson, 'trim');
    updateObj = dbHelpers.createUpdateArray(dataJson, ogLen - delArr.length);

    console.log('update: ', updateObj);
    console.log('new: ', dataJson);

    //delete
    const deleteQuery = `UPDATE markers 
    SET deleted = true WHERE id = $1 
    RETURNING *;`;
    for (const id of delArr) {
      db.query(deleteQuery, [Number(id)])
        .catch(err => console.log(err));
    }

    // update map title/desc
    const mapUpQueryTitle = `UPDATE maps
    SET title = $1 WHERE id = $2
    RETURNING *;`;
    const mapUpQueryDesc = `UPDATE maps
    SET description = $1 WHERE id = $2
    RETURNING *;`;
    db.query(mapUpQueryTitle, [mapTitle, Number(req.params.id)])
    .catch(err => console.log(err));
    db.query(mapUpQueryDesc, [mapDesc, Number(req.params.id)])
    .catch(err => console.log(err));

    //update markers
    const updateQuery = `UPDATE markers 
    SET $1 = $2 WHERE latitude = $3
    RETURNING *;`;

    for (const i in updateObj.latitude) {
      for (let [key, value] of Object.entries(updateObj)) {
        // console.log(key, value[i], updateObj.latitude[i]);
        db.query(updateQuery, [key, value[i], updateObj.latitude[i]])
      }
    }

    

    //insert
    const insertQuery = `INSERT INTO markers 
    (map_id, latitude, longitude, title, description, image_url)
    VALUES ($1, $2, $3, $4, $5, $6)`


  });

  return router;
};