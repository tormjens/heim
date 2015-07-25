// start the express framework
var express = require('express');
var colors = require('colors');
var app = express();

// load config
var config = require('./config');

// body parser
var bodyParser = require('body-parser')

//
console.log(colors.green('###############################################'));
console.log(colors.green('# '));
console.log(colors.green('# ') + 'Welcome to ' + colors.bold('Heim'));
console.log(colors.green('# '));
console.log(colors.green('###############################################'));

// allow json in body
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// set the asset directory
app.use(express.static('assets'));

// get routers
var switches = require('./lib/routers/switch'); // switch router
var devices = require('./lib/routers/device'); // device router
var auth = require('./lib/login'); // login router

// require login
app.use(auth);

// the switch route
app.use('/switch', switches);

// devices
app.use('/devices', devices);

// start the server
console.log(colors.green('# '));
console.log(colors.green('# ') + 'Starting http server');
var server = app.listen(config.get('port'), function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log(colors.green('# ') + 'Http server started and listening on port ' + port);
    console.log(colors.green('# '));

    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        console.log(colors.green('###############################################'));
        console.log(colors.green('# '));
        console.log(colors.green('# ') + colors.blue('    |    ') + colors.grey('Local: http://localhost:'+ port));
        console.log(colors.green('# ') + colors.blue('    |    ') + colors.grey('Local: http://'+ add +':'+ port));
        console.log(colors.green('# '));
        console.log(colors.green('###############################################'));
        console.log(colors.green('# '));
    });

});
