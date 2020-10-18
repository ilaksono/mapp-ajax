/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  const dbHelpers = require('../db/dbHelpers')(db);
  router.get("/:id", (req, res) => {
    console.log(req.params.id);
    dbHelpers.getUserById(req.params.id)
    // dbHelpers.getContributorById(req.params.id)
    // dbHelpers.getFavouritesById(req.params.id)
    .then(data => {
      console.log(data)
      const users = data.username;
      const title = data.title
      const description = data.description
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
