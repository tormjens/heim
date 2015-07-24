// start the express framework
var express = require('express');
var app = express();

// load config
var config = require('./config');

// body parser
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// set the asset directory
app.use(express.static('assets'));

// get routers
var switches = require('./lib/routers/switch'); // switch router

// respond with "hello world" when a GET request is made to the homepage
app.use('/switch', switches);

var server = app.listen(config.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Heimwork is listening on http://%s:%s', host, port);
});
