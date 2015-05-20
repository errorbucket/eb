var db = require('../database');

module.exports = function(conn, query, callback) {
    db.aggregate(conn, [
        {$match: {'hash.browserHash': {$eq: query.id}}},
        {$group: {
            _id: '$hash.messageHash',
            id: {$first: '$hash.messageHash'},
            title: {$first: '$message'},
            count: {$sum: 1},
            earliest: {$min: '$timestamp'},
            latest: {$max: '$timestamp'}
        }},
        {$sort: {count: -1}}
    ], callback);
};
