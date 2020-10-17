/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  const dbHelpers = require('../db/dbHelpers')(db);

  router.get("/", (req, res) => {
    const mapURLs = [];
    dbHelpers.loadAllMaps()
    .then(maps => {
      for (const map of maps) {
        const mapStaticURL = dbHelpers.buildStaticURL(map.center_latitude, map.center_longitude, 6, 300, 300, "AIzaSyAzhpPYg-ucwzqHgAPqZfYbXVnmsMazg2I");
        console.log("test", mapStaticURL);
        mapURLs.push(mapStaticURL);
      }
      const templateVars = { mapURLs };
      console.log(mapURLs);
      res.render("home", templateVars);
    }).catch(err => console.log(err) );
  });
  return router;
};
