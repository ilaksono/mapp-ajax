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

    let username = null;
    let userId = null;
    if (req.session.userId) {
      dbHelpers.getUserById(req.session.userId)
      .then(user => {
        username = user.username;
        userId = user.id;
      })
    }

    const allContributed = [];
    const allFavourited = [];
    const allCreated = [];
    console.log("userID", req.params.id)
    dbHelpers.getCreatedById(req.params.id)
    .then(createdMarkers => {
      const loadedMaps = dbHelpers.convertMapMarkersToMapArray(createdMarkers);
      allCreated.push(loadedMaps);

      dbHelpers.getFavouritesById(req.params.id)
      .then(favouritedMarkers => {
        const loadedMaps = dbHelpers.convertMapMarkersToMapArray(favouritedMarkers);
        allFavourited.push(loadedMaps);

        dbHelpers.getContributorById(req.params.id)
        .then(contributedMarkers => {
          const loadedMaps = dbHelpers.convertMapMarkersToMapArray(contributedMarkers);
          allContributed.push(loadedMaps);


        return res.render("users", { allCreated, allFavourited, allContributed, username, userId, active: "your-map" });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
      });
    });
  });
  return router;
};
