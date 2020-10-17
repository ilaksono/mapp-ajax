const { response } = require('express');
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
    console.log(user)
    if (user.username === "" || user.email === "" || user.password === "") {
      res.send("Please enter all fields to register")
    } else {
      db.query(query, [user.username, user.email, user.password])
      res.redirect('maps')
    }
  })
  return router;
};
