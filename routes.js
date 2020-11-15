var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
var unirest = require("unirest");
var all_tickets;
var base64auth;

var data = {
    code: 200,
}

router.get("/", function(req, res) {
    console.log("Log: You are on the  --HOME--  page")

    res.render("index");
});

/*router.get("/about", function(req, res) {
    console.log("Log: You are on the  *ABOUT*   page")

    res.render("about");
});*/

router.get("/login", function(req, res) {
    console.log("Log: You are on the  $LOGIN$   page")

    res.render("login");
});

//this endpoint is to get the next 25 pages
router.get("/tickets", function(req, res) {
    console.log("im here")
    console.log(req.query.next)
    //console.log(all_tickets)
    if (req.query.next) {
        console.log("im inside")

        //console.log(all_tickets)
        var request = unirest("GET", all_tickets.links.next);
        request.headers({
            "Authorization": "Basic " + base64auth
        });

        request.end(function(response) {
            if (response.error) {
                console.log("Authentication Error");
                data.code = res.code;
                res.render('login', {
                    data: data
                })
            } else {
                //appres.redic
                all_tickets = res.body
                res.render('tickets', {
                    data: response.body
                });
            }
        })
    };
});


router.post('/login', urlencodedParser, function(req, res) {
    //console.log(req.body)
    var authorization_format = req.body.email + ":" + req.body.password;
    base64auth = Buffer.from(authorization_format).toString('base64');
    connect(base64auth, res, req.body.subdomain);
});

function connect(base64auth, appres, link) {
    var req = unirest("GET", link + "/api/v2/tickets.json?page[size]=25");
    req.headers({
        "Authorization": "Basic " + base64auth
    });

    req.end(function(res) {
        if (res.error) {
            console.log("Authentication Error");
            data.code = res.code;
            appres.render('login', {
                data: data
            })
        } else {
            //appres.redic
            all_tickets = res.body
            appres.render('tickets', {
                data: res.body
            });
        }
    });
}


module.exports = router;
