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
    .then(map => {

      console.log("hi");
      console.log(map.);
    }).catch(err => console.log(err) );
/*     const templateVars = {};
    res.render("/", templateVars) */
  });
  return router;
};
