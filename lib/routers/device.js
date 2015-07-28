var express = require('express');
var Device = require('../handlers/device');
var config = require('../../config');
var router = express.Router();

var devices = new Device();

router.get('/', function(req, res) {

    var result = devices.all();

    res.json(result);

});

router.get('/:type', function(req, res) {

    var result = devices.filter(req.params.type);

    res.json(result);

});

module.exports = router;
