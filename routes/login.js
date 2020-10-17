const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    return res.render('login')
  });

  router.post("/", (req, res) => {
    const user = req.body
    const query = `
    SELECT * FROM users
    WHERE email = $1
    AND password = $2
    `
    db.query(query, [user.email, user.password])
    .then(response => {
      console.log(response.rows[0].username)
      constDbUser = response.rows[0]
      if (constDbUser.email.length > 0) {
        console.log("hello", constDbUser.username)
        res.redirect('login')
      }
      res.send("Please enter email and password")
    })

  });

  return router;
};

// if (user.email === "" || user.password === "") {
//   res.send("403: Failed to login");
// }
