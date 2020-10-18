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
    const markerIDs = dataJson.og_marks.split(',');
    console.log(markerIDs);
    for(let i = 0; i < markerIDs.length; i++) {
      if(!markerIDs[i]) {
        markerIDs.splice(i, 1);
        i--;
      } 
    }
    // console.log(delArr);
    delete dataJson.deleted;
    delete dataJson.og_len;
    delete dataJson.map_title;
    delete dataJson.map_desc;
    delete dataJson.og_marks;
    console.log(dataJson, 'trim');
    const updateObj = dbHelpers.createUpdateArray(dataJson, ogLen - delArr.length) || {};

    console.log('update: ', updateObj);
    console.log('new: ', dataJson);

    const insertObj = dbHelpers.createLocationsArray(dataJson) || {};
    console.log(insertObj, 'insert');

    //delete
    const deleteQuery = `UPDATE markers 
    SET deleted = true WHERE id = $1 
    RETURNING *;`;
    for (const id of delArr) {
      db.query(deleteQuery, [Number(id)])
        .catch(err => console.log(err, '1'));
    }

    // update map title/desc
    const mapUpQueryTitle = `UPDATE maps
    SET title = $1 WHERE id = $2
    RETURNING *;`;
    const mapUpQueryDesc = `UPDATE maps
    SET description = $1 WHERE id = $2
    RETURNING *;`;
    db.query(mapUpQueryTitle, [mapTitle, Number(req.params.id)])
      .catch(err => console.log(err, '4'));
    db.query(mapUpQueryDesc, [mapDesc, Number(req.params.id)])
      .catch(err => console.log(err, '5'));

    //update markers

    for (const i in updateObj.latitude) {

      let updateQuery;
      // console.log(key, typeof value[i]);
      // console.log(key, value[i], updateObj.latitude[i]);
      updateQuery = `UPDATE markers 
           SET title = $1 WHERE id = $2;`;
      db.query(updateQuery, [updateObj.title[i], Number(markerIDs[i])])
        .catch(err => console.log(err, '2-1'));
      updateQuery = `UPDATE markers 
            SET description = $1 WHERE id = $2
           ;`;
      db.query(updateQuery, [updateObj.description[i], Number(markerIDs[i])])
        .catch(err => console.log(err, '2-2'));
      updateQuery = `UPDATE markers 
            SET image_url = $1 WHERE id = $2
           ;`;
      db.query(updateQuery, [updateObj.image_url[i], Number(markerIDs[i])])
        .catch(err => console.log(err, '2-3'));
    }

    // if (key !== 'latitude' && key !== 'longitude' && key !== 'map_id') {
    //   db.query(updateQuery, [`${key}`, value[i], updateObj.latitude[i]])
    //     .catch(err => console.log(err, '2'));
    // }

    //insert
    const insertQuery = `INSERT INTO markers (map_id, latitude, longitude, title, description, image_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`;
    for (const i in insertObj.lat) {
      const queryParams = [Number(req.params.id), insertObj.lat[i], insertObj.lng[i]
        , insertObj.title[i], insertObj.desc[i], insertObj.img[i]];
      // console.log(queryParams);
      db.query(insertQuery, queryParams)
        .catch(err => console.log(err, '3'));
    }

    return res.status(200).json({url: '/maps'});
  });

  return router;
};