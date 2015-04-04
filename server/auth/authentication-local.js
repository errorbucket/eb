// Adapter for LocalStrategy
// This authentication method supports username/password validation
// This file acts as an example

var _ = require('lodash');

var config = require('../../config/config');

var enabled = config.useAuth && _.contains(Object.keys(config.authMethods), 'local');

if (enabled) {
    var method = config.authMethods.local;

    var strategy = require('passport-local').Strategy;
    var strategyName = 'local';
    var users = method.users || [{ username: 'admin', password: '21232f297a57a5a743894a0e4a801fc3' }]; // pass: admin

    exports.strategyName = strategyName;
    exports.strategy = new strategy(function(username, password, done) {
        if (validateUsernameAndPassword(users, username, password)) {
            done(null, username);
        } else {
            done(null, false);
        }
    });
} else {
    module.exports = null;
}

function validateUsernameAndPassword(users, username, password) {
    var valid = false;
    _.forEach(users, function(val) {
        if (val.username === username && val.password === password) {
            valid = true;
            return false;
        }
    });
    return valid;
}
