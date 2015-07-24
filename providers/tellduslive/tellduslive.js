var TelldusAPI = require('telldus-live');
var config = require('../../config');

var publicKey    = config.devices.tellduslive.public,
    privateKey   = config.devices.tellduslive.private,
    token        = config.devices.tellduslive.token,
    tokenSecret  = config.devices.tellduslive.secret,
    cloud;

cloud = new TelldusAPI.TelldusAPI({
    publicKey  : publicKey,
    privateKey : privateKey
}).login(token, tokenSecret, function(err, user) {
    if (!!err) return console.log('login error: ' + err.message);

    console.log('Telldus API successfull.');

}).on('error', function(err) {
    console.log('Telldus API failed.');
});

module.exports = {
    on: function(id) {
        cloud.onOffDevice(id, 'On', function(err, result) {
            return true;
        });
    },
    off: function(id) {
        cloud.onOffDevice(id, 'Off', function(err, result) {
            return true;
        });
    },
    getState: function(id) {
        return 1;
    },
    // TODO <---
    dim: function(id, level) {
        return true;
    },
    devices: function() {
        cloud.getDevices(function(err, devices) {
          if (!!err) return console.log('getDevices: ' + err.message);

          return devices;
        });
    }

};
