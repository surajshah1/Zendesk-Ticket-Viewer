const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const unirest = require('unirest');

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/tickets', function(req, res) {
    const base64auth = req.query.auth;
    const subdomain = req.query.subdomain;
    const next = req.query.next;
    const prev = req.query.prev;
    renderTickets(base64auth, res, subdomain, next, prev);
});

router.post('/login', urlencodedParser, function(req, res) {
    const authorizationFormat = `${req.body.email}:${req.body.password}`;
    base64auth = Buffer.from(authorizationFormat).toString('base64');
    res.redirect(`/tickets?auth=${base64auth}&subdomain=${req.body.subdomain}`);
});

function renderTickets(base64auth, appres, link, next, prev) {
    let url;
    //handle first call to function not having next or prev
    if (next) {
        url = `${link}/api/v2/tickets.json?page[size]=25&page[after]=${next}`;
    } else {
        url = `${link}/api/v2/tickets.json?page[size]=25`;
    }

    const req = unirest('GET', url);
    req.headers({
        Authorization: `Basic ${base64auth}`
    });
    req.end(function(res) {
        if (res.error) {
            console.log('Authentication Error');
        } else {
            const newUrl = new URL(res.body.links.next);
            const next = newUrl.searchParams.get('page[after]');
            appres.render('tickets', {
                hasMore: res.body.meta.has_more,
                auth: base64auth,
                subdomain: link,
                next,
                data: res.body
            });
        }
    });
}

module.exports = router;