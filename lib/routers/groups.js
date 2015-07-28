var express = require('express');
var Device = require('../handlers/device');
var config = require('../../config');
var router = express.Router();

var devices = new Device();

router.get('/', function(req, res) {

    var result = config.get('groups');

    var groups = [];

    result.forEach(function(item) {
        var group = {};
        group.name = item.name;
        group.devices = [];
        item.devices.forEach(function(that) {
            var name = that.split('_');
            var device = devices.get(name[0], name[1]);
            if(device) {
                group.devices.push(device);
            }
        });
        groups.push(group);
    });



    res.json(groups);

});

module.exports = router;
