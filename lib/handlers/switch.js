
var config = require('../../config');

/**
 * Switch handler
 *
 * Used to manage on/off devices (lightbulbs and sockets)
 *
 */
var Switch = function(args) {

    // variables
    this.provider       = null;
    this.provider_id    = args.provider;
    this.id             = args.id;

    // find the provider type
    if(config.get('providers')[args.provider]) {
        var prov = config.get('providers')[args.provider];

        args.provider = prov.type;
    }
    else {
        this.provider = null;
        return;
    }

    // lets check if our provider exists
    var provider;
    try {
        provider = require( '../../providers/'+ args.provider +'/'+ args.provider );
    }
    catch( e ) {
        provider = null;
    }

    // require the provider supplied
    this.provider = provider;

    if(this.provider !== null && this.provider.type.indexOf('switch') === -1) {
        this.provider = null;
    }

};

/**
 * Turns a switch on
 * @return {Boolean} The result of the command
 */
Switch.prototype.on = function() {

    // we always need a provider
    if(this.provider === null) return false;

    this.setState(1);

    return this.provider.on(this.id);

};

/**
 * Turns a switch off
 * @return {Boolean} The result of the command
 */
Switch.prototype.off = function() {

    // we always need a provider
    if(this.provider === null) return false;

    this.setState(0);

    return this.provider.off(this.id);

};

/**
 * Sets the state
 */
Switch.prototype.getState = function() {

    var id = this.provider_id + '_' + this.id,
        state = config.get('states:' + id);

    return state ? state : 0;

};

/**
 * Sets the state of a device
 */
Switch.prototype.setState = function(state) {

    var id = this.provider_id + '_' + this.id;

    config.set('states:' + id, state);

    config.save();
    // when its on the state is 1
    // when its off the state is 0
};

/**
 * Fetches a list of availiable devices
 * @return {Array} An array of devices
 */
Switch.prototype.devices = function() {

    // we always need a provider
    if(this.provider === null) return false;

    return this.provider.devices();

};

/**
 * Toggles a switch
 *
 * Inverts the current state of the switch, then
 * waits for two seconds and then reverts back to its original state.
 *
 * @return {Boolean} The result of the command
 */
Switch.prototype.toggle = function() {

    // we always need a provider
    if(this.provider === null) return false;

    // lets rename the instance, so we can use it inside other scopes
    var that = this;

    // if the current state is "on", lets toggle that
    if(that.getState() === 1) {
        that.provider.off(that.id);
        that.setState(0);
        setTimeout(function() {
            that.provider.on(that.id);
            that.setState(1);
        }, 2000);

        return true;
    }
    // if the current state is "off", lets toggle that
    else if(that.getState() === 0) {
        that.provider.on(that.id);
        that.setState(1);
        setTimeout(function() {
            that.provider.off(that.id);
            that.setState(0);
        }, 2000);

        return true;
    }

    // the default is to fail
    return false;


};

module.exports = Switch;
