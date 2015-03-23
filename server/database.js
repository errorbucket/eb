var path = require('path');
var NeDB = require('nedb');

var config = require('../config/config.js');
var db = new NeDB({
    filename: path.join(__dirname, '..', config.dbfile),
    autoload: true
});

db.ensureIndex({
    fieldName: 'timestamp'
});

module.exports = db;
