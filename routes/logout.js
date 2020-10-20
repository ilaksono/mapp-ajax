const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session = null;
    success_msg = "You have succesfully logged out"
    return res.render('login', { success: success_msg, username: null, userId: null, active: "login" } );
  })
return router;
}
