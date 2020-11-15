var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');

var routes = require("./routes")

var app = express();


app.set("port", process.env.PORT || 8080);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);

app.listen(app.get("port"),function(){
    console.log("Server started on http://localhost:" + app.get("port"));
});
