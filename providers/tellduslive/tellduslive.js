// config module to be loaded where needed
var config = require('../../config');

// module specific modules
var TelldusAPI = require('telldus-live');

// collect the keys and stuff from the config file
var publicKey    = config.providers.tellduslive.public,
    privateKey   = config.providers.tellduslive.private,
    token        = config.providers.tellduslive.token,
    tokenSecret  = config.providers.tellduslive.secret,
    cloud;

// setup a new telldus live instance
cloud = new TelldusAPI.TelldusAPI({
    publicKey  : publicKey,
    privateKey : privateKey
}).login(token, tokenSecret, function(err, user) {
    if (!!err) return console.log('login error: ' + err.message);

    // console.log('Telldus API successfull.');

}).on('error', function(err) {
    // console.log('Telldus API failed.');
});

/**
 * Telldus Live! Provider Module
 * @type    {Object}
 */
module.exports = {

    // the types of devices this provider supports
    type: ['switch', 'dimmer', 'sensor'],

    /**
     * Turns on a switch
     * @param   {Integer} id The device ID
     * @return  {Boolean}
     */
    on: function(id) {
        cloud.onOffDevice(id, 'On', function(err, result) {
            return true;
        });
    },

    /**
     * Turns off a switch
     * @param   {Integer} id The device ID
     * @return  {Boolean}
     */
    off: function(id) {
        cloud.onOffDevice(id, 'Off', function(err, result) {
            return true;
        });
    },

    /**
     * Gets the state of a device
     *
     * @todo    Implement a persistant layer so this is stored somewhere (maybe as simple as a json-file)
     * @param   {Integer} id The zone ID
     * @return  {Boolean}
     */
    getState: function(id) {
        return 1;
    },

    /**
     * Dims the device
     *
     * @todo    Implement
     * @param   {Integer} id    The zone ID
     * @param   {Integer} level The level to dim
     * @return  {Boolean}
     */
    dim: function(id, level) {
        return true;
    },
    /**
     * Gets the list of availiable devices
     *
     * @todo Does not work
     * @return {Array}
     */
    devices: function() {
        cloud.getDevices(function(err, devices) {
          if (!!err) return console.log('getDevices: ' + err.message);

          return devices;
        });
    }

};
