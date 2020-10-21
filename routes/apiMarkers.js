const express = require('express');
const { request } = require('express');
const router = express.Router();

module.exports = (db) => {
  const dbHelpers = require('../db/dbHelpers')(db);

  
  router.put('/:id', (req, res) => {
    console.log(req.body, 'req');
    const dataJson = req.body;
    let delArr = dataJson.deleted.split(',');
    if (delArr[0] === '')
      delArr = [];
    const ogLen = Number(dataJson.og_len);
    const mapTitle = dataJson.map_title;
    const mapDesc = dataJson.map_desc;
    const markerIDs = dataJson.og_marks.split(',');
    for (let i = 0; i < markerIDs.length; i++) {
      if (!markerIDs[i]) {
        markerIDs.splice(i, 1);
        i--;
      }
    }
    console.log(dataJson);
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
    // contrib table
    // const exists = dbHelpers.getExistingContributor(req.params.id, testUser)
    const contribQuery = `SELECT * FROM contributors
    WHERE map_id = $1 AND user_id = $2;`;

    db.query(contribQuery, [req.params.id, req.session.userId])
      .then(data => {
        // console.log(data.rows[0]);

        if (!data.rows[0]) {
          const contribInsQuery = `INSERT INTO contributors (map_id, user_id)
      VALUES ($1, $2)
      RETURNING *;`;
          db.query(contribInsQuery, [req.params.id, req.session.userId])
            .catch(er => console.log(er));
        }
        return data.rows[0];
      })
      .catch(er => console.log(er, 'con'));
    // console.log(exists);
    // if (!exists[0]) {
    //   const contribQuery = `INSERT INTO contributors (map_id, user_id)
    //   VALUES ($1, $2)
    //   RETURNING *;`;
    //   db.query(contribQuery, [req.params.id, req.session.userId])
    //     .catch(er => console.log(er));
    // }
    return res.status(200).json({ url: '/maps' });
  });

  router.get('/:id/fav', (req, res) => {
    const favQuery = `SELECT * FROM favourites
    WHERE map_id = $1 AND user_id = $2
    ;`;
    db.query(favQuery, [req.params.id, req.session.userId])
      .then(data => {
        if (data.rows[0]) {
          if (data.rows[0].id) return res.status(200).json({ val: true });
        }
        else
          return res.status(200).json({ val: false });
      }).catch(err => console.log(err, '1'));
  });

  router.post('/:id/fav', (req, res) => {
    const favQuery = `INSERT INTO favourites
    (user_id, map_id) VALUES ($1, $2)
    RETURNING *;
    `;
    db.query(favQuery, [req.session.userId, req.params.id])
      .then(data => {
        console.log(data.rows[0]);
        return res.status(200).json({ val: 'INSERT' });
      }).catch(err => console.log(err, '2'));
  });

  router.delete('/:id/fav', (req, res) => {
    const favQuery = `DELETE FROM favourites 
    WHERE user_id = $1 AND map_id = $2
    RETURNING *;`;
    db.query(favQuery, [req.session.userId, req.params.id])
      .then(data => {
        console.log(data.rows[0]);
        return res.status(200).json({ val: 'DELETE' });
      }).catch(err => console.log(err, '3'));
  });

  router.get('/images/:id', (req, res) => {
    const query = `SELECT image_url FROM markers 
    WHERE id = $1;`;
    db.query(query, [Number(req.params.id)])
      .then(data => {
        // console.log(data.rows);
        return res.status(200).json(data.rows[0]);
      })
      .catch(err => console.log(err));
  });

  // router.get('/authorize/auth', (req, res) => {

  //   if (!req.session.userId)
  //     return res.json({ login: false });
  //   dbHelpers.getUserById(req.session.userId)
  //     .then(user => {
  //       if (user)
  //         return res.status(200).json({ login: true });
  //       else
  //         return res.json({ login: false });
  //     }).catch(err => console.log(err));
  // });

  // router.get('/fav', (req, res) => {

  //   query = `
  //   `

  // })

  router.get('/center/center', (req, res) => {
    return dbHelpers.fetchLatlngByIP()
    .then(data => {
      return res.json(data);
    }).catch(err => console.log(err, '10'));
  })
  router.get('/hearts/all', (req, res) => {
    const query = `SELECT id FROM maps 
    JOIN favourites ON maps.id = map_id    
    ORDER BY id DESC;`;
    
    db.query(query, [])
    .then(data => res.json(data.rows))
    .catch(er => console.log('lul', er)); 

  })

  router.get('/personal/personal', (req, res) => {
    if(req.session.userId) {
      const query = `SELECT map_id FROM favourites
      WHERE user_id = $1;`
      return db.query(query, [req.session.userId])
      .then(data => {
        if (data.rows) return res.json(data.rows);
        else return res.json({map_id:''});
      })
      .catch(er => console.log('hi', er));
    }
  })
  
  router.get('/:id', (req, res) => {
    const query = `
    SELECT markers.id,owner_id, latitude, longitude, markers.title, markers.description
    ,image_url,maps.title as maps_title,date_created as maps_date_created, maps.description as maps_description, users.username 
    FROM markers JOIN maps ON (map_id = maps.id)
    JOIN users ON (owner_id = users.id)
    WHERE map_id = $1 AND markers.deleted = false;`;
    return db.query(query, [req.params.id])
      .then(data => {
        // console.log(data.rows);
        return res.json(data.rows);
      })
      .catch(err => console.log(err, '123'));
  });


  return router;
};