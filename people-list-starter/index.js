const express = require('express');
const url = require('url');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.set('view engine', 'ejs');

let peopleJson = JSON.parse(fs.readFileSync('data/people.json'));

function homePage(req, res) {
    res.render('home', {
        people: peopleJson,
    });
}

function personPage(req, res) {
    let parsedUrl = url.parse(req.url, true);
    let index = Number(parsedUrl.query.index);
    let currentPerson = peopleJson[index]

    res.render('person', {
        person: currentPerson,
    });
}

app.get('/', homePage);
app.get('/person', personPage);

function listenCallback() {
    console.log('Listening on http://' + hostname + ':' + port);
}

app.listen(port, hostname, listenCallback);