var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// verify this with Postman
router.post("/login", function (req, res, next) {
  if (req.body.email != "" && req.body.email == req.body.password) {
    //creating the session with user information (email)
    req.session.user = req.body.email;
    res.send({ result: "success", msg: "login is successful." });
  } else {
    res.send({ result: "fail", msg: "login failed." });
  }
});


//Authentication => login & logout 
//Authorization => Access Control

module.exports = router;
