const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:id', (req, res) => {
    const query = `
    SELECT markers.id, latitude, longitude, markers.title, markers.description,image_url, users.username 
    FROM markers JOIN maps ON (map_id = maps.id)
    JOIN users ON (owner_id = users.id) 
    WHERE map_id = $1 AND markers.deleted = false;`;
    return db.query(query, [Number(req.params.id)])
    .then(data => {
      console.log(data.rows);
      return res.json(data.rows); 
    })
    .catch(err => console.log(err));
  });

  return router;
}