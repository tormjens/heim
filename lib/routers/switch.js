var express = require('express');
var Switch = require('../handlers/switch');
var config = require('../../config');
var router = express.Router();


// middleware specific to this router (will be oauth2 later)
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/:provider', function(req, res) {
    var args = {
        provider    : req.params.provider,
        id          : null
    };

    var that = new Switch(args);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    var devices = that.devices();

    console.log(devices);

    // res.write();

    res.end();
});

// pass the routing request
router.post('/:provider', function(req, res, next) {

    if(!req.body.id) {
        res.error('An ID is needed to use a switch');
        return false;
    }

    var args = {
        provider    : req.params.provider,
        id          : req.body.id
    };

    var that = new Switch(args);

    var result = false;

    var cmd = null;

    console.log(req.body.state);

    if(req.body.state == 2) {
        result = that.off();
        var cmd = 'off';
    }

    else if(req.body.state == 3) {
        result = that.toggle();
        var cmd = 'toggle';
    }

    else {
        result = that.on();
        var cmd = 'on';
    }

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

    res.end();


});

module.exports = router;
