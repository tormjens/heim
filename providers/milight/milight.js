// config module to be loaded where needed
var config = require('../../config');

// module specific modules
var WifiBoxModule = require('./lib/wifibox.js');
var cmd = require('./lib/commands.js');

/**
 * Milight Provider Module
 * @type    {Object}
 */
module.exports = {

    // the types of devices this provider supports
    type: ['switch', 'dimmer'],

    /**
     * Fetches the client
     * @return  {Object} Returns a WifiBoxModule-instance
     */
    client: function() {
        return new WifiBoxModule(config.providers.milight.ip, config.providers.milight.port);
    },

    /**
     * Turns on a switch
     * @param   {Integer} id The zone ID
     * @return  {Boolean}
     */
    on: function(id) {
        var result = this.client().command(cmd.white.on(id));
        return result.error === 0;
    },

    /**
     * Turns off a switch
     * @param   {Integer} id The zone ID
     * @return  {Boolean}
     */
    off: function(id) {
        var result = this.client().command(cmd.white.off(id));
        return result.error === 0;

    },

    /**
     * Gets the state of a zone
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
     * @todo    Milight does not support dimming to a specific level, maybe we'll have to rethink this
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
     * For the Millight this is (for now at least 4 zones, so we'll just hardcode these are there is not API method)
     *
     * @return {Array}
     */
    devices: function() {
        return [
            {
                id: 1,
                name: "Zone 1",
            },
            {
                id: 2,
                name: "Zone 2",
            },
            {
                id: 3,
                name: "Zone 3",
            },
            {
                id: 4,
                name: "Zone 4",
            }
        ];
    }
};
