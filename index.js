var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var database = require('./config/database');
var formattChecker = require('./services/format-integrity-service');
var queryService = require('./services/test-data-query-service');

var app = express();
var port = process.env.PORT || 8888;

//mongoose.connect(database.url);

//Query should look like "customer-with-good-credit"
app.get('/find/:query', function (req, res) {
    const query = req.params.query;

    if (!formattChecker.isValid(query)) {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            Error: "Sorry, couldn't understand the query!"
        }));
    } else {

        var testData = queryService.execute(query);

        if (!testData.exists) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                error: "Sorry, couldn't find test data matching the query"
            }));
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                response: testData.data
            }))
        };
    }
});

app.get('/health', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
        status: "OK"
    }));
}).listen(port);

console.log('server running om port 3000 :)');