const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    return res.render('register')
  });

  router.post("/", (req, res) => {
    const user = req.body
    const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3) RETURNING *;
    `
    res.redirect('maps')
    return db.query(query, [user.username, user.email, user.password])
  })
  return router;
};
