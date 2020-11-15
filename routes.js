var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

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

router.post('/login', urlencodedParser, function (req, res) {
  //console.log(req.body)
  res.send('the link is: ' + req.body.subdomain + ', email is: ' + req.body.email + ', password is: ' + req.body.password)
})

module.exports = router;
