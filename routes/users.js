/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`
    SELECT users.username, maps.title, maps.description
    FROM users
    JOIN maps ON users.id=maps.owner_id
    WHERE users.id = 1;
    `)
      .then(data => {
        const users = data.rows[0].username;
        const title = data.rows[0].title
        const description = data.rows[0].description
        const templateVars = {
          user: users,
          title: title,
          description: description
        };
        res.render('users', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
