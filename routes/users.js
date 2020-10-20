/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { Template } = require('ejs');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  const dbHelpers = require('../db/dbHelpers')(db);
  router.get("/:id", (req, res) => {
    const allContributed = []
    const allFavourited = []
    console.log("All fav", allFavourited)
    dbHelpers.getFavouritesById(req.params.id)
    .then(fav => {

      for (const item of fav) {
        const mapStaticURL = dbHelpers.buildStaticURL(item.center_latitude, item.center_longitude, 6, 250, 250, "AIzaSyAzhpPYg-ucwzqHgAPqZfYbXVnmsMazg2I");
          allFavourited.push({ id: item.id, mapStaticURL, title: item.title, description: item.description });
      }
    })
    dbHelpers.getContributorById(req.params.id)
    .then(data => {
      for (const item of data) {
        const mapStaticURL = dbHelpers.buildStaticURL(item.center_latitude, item.center_longitude, 6, 250, 250, "AIzaSyAzhpPYg-ucwzqHgAPqZfYbXVnmsMazg2I");
          allContributed.push({ id: item.id, mapStaticURL, title: item.title, description: item.description });
      }
      dbHelpers.getUserById(req.params.id)
      .then(user => {
        const templateVars = {
          allFavourited,
          allContributed,
          username: user.username,
          userId: user.id,
          active: "your-map"
        }
        res.render('users', templateVars);
      })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};
