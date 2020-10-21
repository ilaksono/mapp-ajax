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
    const allCreated = []
    console.log("userID", req.params.id)
    dbHelpers.getCreatedById(req.params.id)
    .then(created => {
      for (const item of created) {
        const markerArr = [];
        dbHelpers.getMarkersByMapID(item.id)
        .then(markers => {
          for (const marker of markers) {
            markerArr.push({ latitude: marker.latitude, longitude: marker.longitude });
          }
          return markerArr;
        })
        .then(markerArray => {
          const mapStaticURL = dbHelpers.buildStaticURL(item.center_latitude, item.center_longitude, 6, 220, 250, "AIzaSyAzhpPYg-ucwzqHgAPqZfYbXVnmsMazg2I", markerArray);
          allCreated.push({ id: item.id, mapStaticURL, title: item.title, description: item.description, date_created: item.date_created, user: item.username });
        });
      }
    })
    dbHelpers.getFavouritesById(req.params.id)
    .then(fav => {

      for (const item of fav) {
        const markerArr = [];
        dbHelpers.getMarkersByMapID(item.id)
        .then(markers => {
          for (const marker of markers) {
            markerArr.push({ latitude: marker.latitude, longitude: marker.longitude });
          }
          return markerArr;
        })
        .then(markerArray => {
          const mapStaticURL = dbHelpers.buildStaticURL(item.center_latitude, item.center_longitude, 6, 220, 250, "AIzaSyAzhpPYg-ucwzqHgAPqZfYbXVnmsMazg2I", markerArray);
          allFavourited.push({ id: item.id, mapStaticURL, title: item.title, description: item.description, date_created: item.date_created, user: item.username });
        });
      }
    })
    dbHelpers.getContributorById(req.params.id)
    .then(data => {
      for (const item of data) {
        const markerArr = [];
        dbHelpers.getMarkersByMapID(item.id)
        .then(markers => {
          for (const marker of markers) {
            markerArr.push({ latitude: marker.latitude, longitude: marker.longitude });
          }
          return markerArr;
        })
        .then(markerArray => {
          const mapStaticURL = dbHelpers.buildStaticURL(item.center_latitude, item.center_longitude, 6, 220, 250, "AIzaSyAzhpPYg-ucwzqHgAPqZfYbXVnmsMazg2I", markerArray);
          allContributed.push({ id: item.id, mapStaticURL, title: item.title, description: item.description, date_created: item.date_created, user: item.username });
        });
      }
      dbHelpers.getUserById(req.params.id)
      .then(user => {
        console.log("allCreated", allCreated)
        const templateVars = {
          allCreated,
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
