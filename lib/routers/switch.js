var express = require('express');
var Switch = require('../handlers/switch');
var config = require('../../config');
var router = express.Router();


// middleware specific to this router (will be oauth2 later)
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// a HTTP GET request with only the provider will provide a list of all devices
// for that provider
router.get('/:provider', function(req, res) {

    // set up the switch arguments
    var args = {
        provider    : req.params.provider,
        id          : null
    };

    // create a new switch instance
    var that = new Switch(args);

    // set the header to 200 and prepare json output
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // get the devices
    var devices = that.devices();

    console.log(devices);

    // res.write();

    // end the output
    res.end();
});

// pass the routing request
router.post('/:provider', function(req, res, next) {

    // you always need to pass an id in the HTTP POST request
    if(!req.body.id) {
        res.error('An ID is needed to use a switch');
        return false;
    }

    // setup the switch arguments
    var args = {
        provider    : req.params.provider,
        id          : req.body.id
    };

    // create a new switch instance
    var that = new Switch(args);

    // the default result is false
    var result = false;

    // we have not sent a command yet
    var cmd = null;

    // 2 means off
    if(req.body.state == 2) {
        result = that.off();
        var cmd = 'off';
    }

    // 3 means toggle
    else if(req.body.state == 3) {
        result = that.toggle();
        var cmd = 'toggle';
    }

    // 1 and everything else means on
    else {
        result = that.on();
        var cmd = 'on';
    }

    // if the result is success we are send json data with a HTTP 200 status
    if(result) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
            provider: args.provider,
            id: args.id,
            success: 1,
            cmd: cmd,
            msg: 'Command was executed.'
        }));
    }
    // if the result is failure we are send json data with a HTTP 404 status
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
            provider: args.provider,
            id: args.id,
            success: 0,
            cmd: cmd,
            msg: 'Command was not executed.'
        }));
    }

    // end the document
    res.end();

});

module.exports = router;
