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
        device.endpoint = '/' + device.type + '/' + device.provider;
        var id = device.provider + '_' + device.id,
            state = config.get('states:' + id);
        var currentState = state ? state : 0;
        device.state = currentState;
        device.isToggled = !!currentState;
        return device;
    });

    return filteredDevices;

};

/**
 * Returns all devices
 * @return {Array}
 */
Device.prototype.all = function() {

    return this._devices;

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

    var device = this._devices.filter(function(device){
        if(device.id == id) {
            return true;
        }
        else {
            return false;
        }
    });
    if(device) {
        return device[0];
    }

    return null;
};

module.exports = Device;
