const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");


module.exports = (db) => {
  const dbHelpers = require('../db/dbHelpers')(db);
  router.get("/", (req, res) => {
    return res.render('login', { username: null, userId: null, active: "login" });
  });

  router.post("/", (req, res) => {
    const user = req.body;
    req.session.userId = "";
    const query = `;
    SELECT * FROM users
    WHERE email = $1;
    `;
    if (user.email === "" || user.password === "") {
      const err_msg = 'Please enter a valid email and password';
      return res.status(400).render('login', { err_msg: err_msg, username: null, userId: null, active: "login" });
    }
    db.query(query, [user.email])
      .then(response => {
        const dbUser = response.rows[0];
        if (dbUser) {
          bcrypt.compare(user.password, dbUser.password, (err, result) => {
            if (result) {
              req.session.userId = dbUser.id;
              dbHelpers.fetchLatlngByIP()
                .then(data => {
                  const coords = { lat: JSON.parse(data).data.latitude, lng: JSON.parse(data).data.longitude };
                  req.session.coords = coords;
                  res.redirect('maps');
                });
            } else {
              const err_msg = 'Failed to login';
              return res.status(400).render('login', { err_msg: err_msg, username: null, userId: null, active: "login" });
            }
          });
        } else {
          const err_msg = 'Failed to login';
          return res.status(400).render('login', { err_msg: err_msg, username: null, userId: null, active: "login" });
        }
      });
  });

  return router;
};
