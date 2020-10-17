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
    db.query(query, [user.email, user.password])
    .then(response => {
      const dbUser = response.rows[0]
      if (dbUser.email.length > 0) {
        res.redirect('maps')
      }
      res.send("Please enter email and password")
    })

  });

  return router;
};
