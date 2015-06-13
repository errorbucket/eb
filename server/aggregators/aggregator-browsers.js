var db = require('../database');
var browserName = require('./browser-name');

module.exports = function(conn, query, callback) {
    db.aggregate(conn, [
        {$group: {
            _id: '$hash.browserHash',
            title: {$first: browserName},
            count: {$sum: 1},
            earliest: {$min: '$timestamp'},
            latest: {$max: '$timestamp'}
        }},
        {$sort: {count: -1}},
        {$limit: 100}
    ], callback);
};
