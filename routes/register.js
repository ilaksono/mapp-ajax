const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
// const dbHelpers = require('../db/dbHelpers');
const { render } = require('ejs');
const e = require('express');
const salt = bcrypt.genSaltSync(10);



module.exports = (db) => {
  const dbHelpers = require('../db/dbHelpers')(db);

  router.get("/", (req, res) => {
    if (req.session.userId) {
      dbHelpers.getUserById(req.session.userId)
        .then(user => {
          const templateVars = {
            username: user.username,
            userId: user.id,
            email: user.email,
            active: null
          };
          return res.render('register', templateVars);
        });
    } else {
      return res.render('register', { username: null, userId: null, email: null, active: 'register' });
    }
  });

  router.post("/", (req, res) => {
    const userInput = req.body;
    // WHY AM I DOING THIS, you'll remember
    const insertQuery = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3) RETURNING *;
    `;
    const alterQueryWithPassword = `
    UPDATE users
    SET username = $1, email = $2, password = $3
    WHERE id = $4
    RETURNING *;
    `;
    const alterQueryNoPassword = `
    UPDATE users
    SET username = $1, email = $2
    WHERE id = $3
    RETURNING *;
    `;
    const dbCheckQuery = `
    SELECT * FROM users
    WHERE email = $1;
    `;

    if (req.session.userId) {
      dbHelpers.getUserById(req.session.userId)
        .then(user => {
          if (userInput.username === "" || userInput.email === "") {
            const templateVars = {
              username: user.username,
              userId: user.id,
              email: user.email,
              active: "register",
              err_msg: 'Please enter a new username or email'
            };
            return res.status(400).render('register', templateVars);
          }
          if (userInput.password === "") {
            db.query(alterQueryNoPassword, [userInput.username, userInput.email, req.session.userId])
              .then(response => {
                req.session.userId = response.rows[0].id;
                return res.redirect('maps');
              });
          } else {
            db.query(alterQueryWithPassword, [userInput.username, userInput.email, bcrypt.hashSync(userInput.password, salt), req.session.userId])
              .then(response => {
                req.session.userId = response.rows[0].id;
                return res.redirect('maps');
              });
          }
        });
    } else {
      if (userInput.username === "" || userInput.email === "" || userInput.password === "") {
        err_msg = 'Please enter all fields to register';
        return res.status(400).render('register', { err_msg: err_msg, username: null, userId: null, active: 'register' });
      }
      db.query(dbCheckQuery, [userInput.email])
        .then(response => {
          const dbUser = response.rows[0];
          if (dbUser) {
            err_msg = 'This email is already associated with an account';
            return res.status(400).render('register', { err_msg: err_msg, username: null, userId: null, active: 'register' });
          } else {
            db.query(insertQuery, [userInput.username, userInput.email, bcrypt.hashSync(userInput.password, salt)])
              .then(response => {
                req.session.userId = response.rows[0].id;
                dbHelpers.fetchLatlngByIP()
                  .then(data => {
                    const coords = { lat: JSON.parse(data).data.latitude, lng: JSON.parse(data).data.longitude };
                    req.session.coords = coords;
                    return res.redirect('maps');
            });
              });
          }
        });
    }
  });
  return router;
};
