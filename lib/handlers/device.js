var config = require('../../config');

/**
 * Device handler
 *
 * Used to get devices from the config and filter them
 *
 */
var Device = function() {
    this._devices = this.map(config.get('devices'));
};

/**
 * Map the devices
 *
 * Adds some information
 *
 * @return {Array}
 */
Device.prototype.map = function(devices) {


    var filteredDevices = devices.map(function(device){
        device.endpoint = '/' + device.type + '/' + device.provider + '/' + device.id;
        return device;
    });

    return filteredDevices;

};

/**
 * Filter the devices
 * @return {Array}
 */
Device.prototype.filter = function(provider) {

    if(provider == 'all' || provider == '*') {
        return this._devices;
    }

    var filteredDevices = this._devices.filter(function(device){
        if(device.provider == provider) {
            return true;
        }
        else {
            return false;
        }
    });

    return filteredDevices;

};

/**
 * Gets a single device
 * @return {Object}
 */
Device.prototype.get = function(provider, id) {

    var devices = this.filter(provider);

    if(devices[id]) {
        return devices[id];
    }

    return null;

};

module.exports = Device;
