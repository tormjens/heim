var express = require('express');
var Device = require('../handlers/device');
var config = require('../../config');
var router = express.Router();

var devices = new Device();


// middleware specific to this router (will be oauth2 later)
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

router.get('/:type', function(req, res) {

    var result = devices.filter(req.params.type);

    res.json(result);

});

module.exports = router;
