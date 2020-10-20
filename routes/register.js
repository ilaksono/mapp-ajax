const express = require('express');
const router  = express.Router();
const bcrypt = require("bcrypt");
const dbHelpers = require('../db/dbHelpers');
const { render } = require('ejs');
const e = require('express');
const salt = bcrypt.genSaltSync(10);



module.exports = (db) => {
  const dbHelpers = require('../db/dbHelpers')(db);

  router.get("/", (req, res) => {
    console.log('there', req.session.userId)
    if(req.session.userId) {
      dbHelpers.getUserById(req.session.userId)
      .then(user => {
        const templateVars = {
          username: user.username,
          userId: user.id,
          email: user.email,
          active: null
        }
      return res.render('register', templateVars);
      });
    } else {
      return res.render('register', { username: null, userId: null, email: null, active: 'register' });
    }
  });

  router.post("/", (req, res) => {
    console.log("session id", req.session.userId);
    const user = req.body
    // WHY AM I DOING THIS, you'll remember
    const insertQuery = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3) RETURNING *;
    `;
    const alterQuery = `
    UPDATE users
    SET username = $1, email = $2, password = $3
    WHERE id = $4
    RETURNING *;
    `;
    const dbCheckQuery = `
    SELECT * FROM users
    WHERE email = $1;
    `;
    if (user.username === "" || user.email === "" || user.password === "") {
      if (req.session.userId) {
        dbHelpers.getUserById(req.session.userId)
        .then(user => {
          const templateVars = {
            username: user.username,
            userId: user.id,
            email: user.email,
            active: "register",
            err_msg: 'Please enter all fields to modify account'
          }
        return res.status(400).render('register', templateVars );
        })
        .catch(err => res.status(400).render("login", { username: null, userId: null, active: 'login' }));
      } else {
        err_msg = 'Please enter all fields to register';
        return res.status(400).render('register', { err_msg: err_msg, username: null, userId: null, active: 'register' } );
      }
    } else {
      db.query(dbCheckQuery, [user.email])
      .then(response => {
        const dbUser = response.rows[0];
        console.log("session id is", req.session.userId);
        console.log("dbUser Is", dbUser);
        if (req.session.userId) {
          db.query(alterQuery, [user.username, user.email, bcrypt.hashSync(user.password, salt), req.session.userId])
          .then(response => {
            console.log("ALTER")
            req.session.userId = response.rows[0].id;
            res.redirect('maps');
          })
        } else if (dbUser) {
          console.log("EEE");
          err_msg = 'This email is already associated with an account';
          return res.status(400).render('register', { err_msg: err_msg, username: null, userId: null, active: 'register' } );
        } else {
          db.query(insertQuery, [user.username, user.email, bcrypt.hashSync(user.password, salt)])
          .then(response => {
            console.log("INSERT")
            req.session.userId = response.rows[0].id;
            res.redirect('maps');
          })
        }
      });
    }
  });
  return router;
};
