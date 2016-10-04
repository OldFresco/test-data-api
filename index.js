var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var database = require('./config/database');

var app = express();
var port = process.env.PORT || 8888;

mongoose.connect(database.url);

app.get('/find/:query', function (req, res) {
    const query = req.params.query;

    if (!QueryFormatIntegrityService.QueryIsValid()) {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            Error: "Sorry, couldn't understand the query!"
        }));
    };

    var testData = TestDataQueryService.Execute(query);

    if (!testData.Exists()) {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            Error: "Sorry, couldn't find test data matching the query"
        }));
    }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
        response: testData
    }));
});

app.get('/health', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
        Status: "OK"
    }));
}).listen(port);

console.log('server running om port 3000 :)');