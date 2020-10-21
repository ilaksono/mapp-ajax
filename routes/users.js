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
    let allCreated = [];
    let allFavourited = [];
    let allContributed = [];

    dbHelpers.getCreatedById(req.params.id)
    .then(createdMarkers => {
      allCreated = dbHelpers.convertMapMarkersToMapArray(createdMarkers);
      dbHelpers.getFavouritesById(req.params.id)
      .then(favouritedMarkers => {
        allFavourited = dbHelpers.convertMapMarkersToMapArray(favouritedMarkers);
        dbHelpers.getContributorById(req.params.id)
        .then(contributedMarkers => {
          allContributed = dbHelpers.convertMapMarkersToMapArray(contributedMarkers);
        })
        .then(() => {
          if (req.session.userId) {
            dbHelpers.getUserById(req.session.userId)
            .then(user => {
              console.log(allCreated);
              return res.render("users", { allCreated, allFavourited, allContributed, username: user.username, userId: user.id, active: "your-map" });
            });
          } else {
            return res.render("users", { allCreated, allFavourited, allContributed, username: null, userId: null, active: "your-map" });
          }
        });
      });
    })
  });
  return router;
};
