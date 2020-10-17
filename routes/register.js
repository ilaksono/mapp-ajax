const { response } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    return res.render('register')
  });

  router.post("/", (req, res) => {
    const user = req.body
    const insertQuery = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3) RETURNING *;
    `
    const dbCheckQuery = `
    SELECT * FROM users
    WHERE email = $1
    `
    if (user.username === "" || user.email === "" || user.password === "") {
      return res.send('Please enter all fields to register')
    }
    db.query(dbCheckQuery, [user.email])
    .then(response => {
      const dbUser = response.rows[0]
      if (dbUser) {
        res.send('This email already exists')
      } else {
        res.redirect('maps')
        return db.query(insertQuery, [user.username, user.email, user.password])
      }
    })
  })
  return router;
};
