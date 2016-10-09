/* SETUP */
// Load up express's web app tool
var express = require('express');
var app = express();

// Load up express jwt authenticaiton tool
var jwt = require('express-jwt');
var jwtCheck = jwt({
    secret: new Buffer('YOUR_CLIENT_SECRET', 'base64'),
    audience: 'YOUR_CLIENT_ID'
});

//Load up morgan logging tool
var morgan = requiure('morgan');

// Load up required service dependencies
var requestProcessor = requiure('./sercices/request-processing-service');


/* CONFIUGRATION */
// Establish connection port 
var port = process.env.PORT || 8888;

// Log requests to STDOUT using Morgan logging tool
app.use(morgan('combined'));

// Protect these endpoints
app.use('listener', jwtCheck);
app.use('info', jwtCheck);


/* ENDPOINT DEFINITIONS: */
// Listener endpoint
app.get('/listener/:request', function(req, res) {

    var outcome = requestProcessor.Process(req);

    if (outcome.isFine) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({
            Response: outcome
        }))
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({
            Error: outcome
        }))
    }
});


// Information endpoint 
app.get('/info', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({
        Name: '[Service Name]',
        Description: '[I do this as a service]',
        Keywords: ['keywordA', 'KeywordB']
    }))
});

// Health check endpoint
app.get('/health', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({
        Status: 'OK'
    }))
}).listen(port);

console.log('server running om port: ' + port + ':)');