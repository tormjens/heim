
var config = require('../../config');

var Switch = function(args) {

    this.provider   = null;
    this.id         = args.id;

    this.provider = require( '../../providers/'+ args.provider +'/'+ args.provider );

};

Switch.prototype.on = function() {

    if(this.provider === null) return false;

    return this.provider.on(this.id);

};

Switch.prototype.off = function() {

    if(this.provider === null) return false;

    return this.provider.off(this.id);

};

Switch.prototype.devices = function() {

    if(this.provider === null) return false;

    return this.provider.devices();

};

Switch.prototype.toggle = function() {

    if(this.provider === null) return false;

    var that = this;

    if(that.provider.getState(that.id) === 1) {
        that.provider.off(that.id);
        setTimeout(function() {
            that.provider.on(that.id);
        }, 2000);

        return true;
    }

    else if(that.provider.getState(that.id) === 0) {
        that.provider.on(that.id);
        setTimeout(function() {
            that.provider.off(that.id);
        }, 2000);

        return true;
    }

    return false;


};

module.exports = Switch;
