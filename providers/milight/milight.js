var WifiBoxModule = require('./lib/wifibox.js');
var cmd = require('./lib/commands.js');
var config = require('../../config');

module.exports = {
    client: function() {
        return new WifiBoxModule(config.devices.milight.ip, config.devices.milight.port);
    },
    on: function(id) {
        var result = this.client().command(cmd.white.on(id));
        return true;
    },
    off: function(id) {
        var result = this.client().command(cmd.white.off(id));
        return true;

    },
    getState: function(id) {
        return 1;
    },
    // TODO <---
    dim: function(id, level) {
        return true;
    },
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
