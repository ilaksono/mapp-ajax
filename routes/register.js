const express = require('express');
const router  = express.Router();
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);



module.exports = (db) => {
  router.get("/", (req, res) => {
    return res.render('register', { user: req.session ? req.session.userId : null });
  });

  router.post("/", (req, res) => {
    const user = req.body
    // WHY AM I DOING THIS, you'll remember
    req.session.userId = "";
    const insertQuery = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3) RETURNING *;
    `
    const dbCheckQuery = `
    SELECT * FROM users
    WHERE email = $1;
    `
    if (user.username === "" || user.email === "" || user.password === "") {
      err_msg = 'Please enter all fields to register';
      return res.render('register', { err_msg: err_msg } );
    }
    db.query(dbCheckQuery, [user.email])
    .then(response => {

      const dbUser = response.rows[0]
      if (dbUser) {
        err_msg = 'This email is already associated with an account';
        return res.render('register', { err_msg: err_msg } );
      } else {
        db.query(insertQuery, [user.username, user.email, bcrypt.hashSync(user.password, salt)])
        .then(response => {
          req.session.userId = response.rows[0].id;
          res.redirect('maps');
        })
      }
    })
  })
  return router;
};
