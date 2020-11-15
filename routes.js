var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
  console.log("Log: You are on the  --HOME--  page")
  res.render("index");
});

router.get("/about", function(req, res){
  console.log("Log: You are on the  *ABOUT*   page")
  res.render("about");
});

router.get("/login", function(req, res){
  console.log("Log: You are on the  $LOGIN$   page")
  res.render("login");
});


module.exports = router;
