var express = require('express');
var config = require('../config');
var router = express.Router();
var basicAuth = require('basic-auth');

var auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    };

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    };

    var userObj = getUser(user.name);

    if(!userObj) {
        return unauthorized(res);
    }

    if (user.name === userObj.username && user.pass === userObj.password) {
        return next();
    } else {
        return unauthorized(res);
    };
};

var getUser = function(username) {
    var users = config.get('users').filter(function(user){
        if(user.username == username) {
            return true;
        }
        else {
            return false;
        }
    });
    if(users[0]) {
        return users[0];
    }
    else {
        return false;
    }
}

// router.use(auth);

module.exports = router;
