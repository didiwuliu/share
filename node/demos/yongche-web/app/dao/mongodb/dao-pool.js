/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-05-04
 * Description: dao-pool
 */
var _poolModule = require('generic-pool')
    , mongoConfig = require('../.././mongodb');

var createMongoPool = function() {
    return _poolModule.Pool({
        name: 'mongo',
        create: function(callback) {
            var mongo = require('mongoskin');
            var client = mongo.db(mongoConfig.url, {
                database: mongoConfig.database,
                safe: mongoConfig.safe
            });
            callback(null, client);
        },
        destroy: function(client) {
            client.close();
        },
        max: 10,
        idleTimeoutMillis: 30000,
        log: false
    });
}

exports.createMongoPool = createMongoPool;