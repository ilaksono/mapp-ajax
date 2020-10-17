const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    return res.render('login')
  });

  router.post("/", (req, res) => {
    const user = req.body
    const query = `
    SELECT * FROM users
    WHERE email = $1
    AND password = $2
    `
    res.redirect('maps')
    return db.query(query, [user.email, user.password])
  });

  return router;
};
