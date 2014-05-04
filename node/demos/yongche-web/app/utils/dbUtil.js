/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-05-04
 * Description: dbUtil
 */
var redis = require('../dao/redis/redis');
var utils = require('./utils');

var dbUtil = module.exports;

/**
 * select db
 * @param redis
 */
dbUtil.selectDb = function(dbIndex, cb) {
    redis.command(function(client) {
        client.select(dbIndex, function() {
            cb(client);
        });
    });
}

/**
 *
 * @param redis
 */
dbUtil.closeDb = function() {
    redis.shutdown();
}

dbUtil.getMultiCommand = function(array, key, object) {
    var obj = {};
    for(var o in object) {
        obj = {};
        if(typeof object[o] == "object") {
            if(Object.prototype.toString.call(object[o]) === '[object Array]') {
                obj[o] = object[o];
                array.push(["hset", key, o, JSON.stringify(obj)]);
            } else {
                array.push(["hset", key, o, JSON.stringify(object[o])]);
            }
        } else {
            array.push(["hset", key, o, object[o]]);
        }
    }
    return array;
}

/**
 * getCommand
 * @param array
 * @param key
 * @param field
 * @param object
 */
dbUtil.getCommand = function(array, key, field, object) {
    var obj = {};

    if(typeof object[field] == "object") {
        if(Object.prototype.toString.call(object[field]) === '[object Array]') {
            obj[field] = object[field];
            array.push(["hset", key, field, JSON.stringify(obj)]);
        } else {
            array.push(["hset", key, field, JSON.stringify(object[field])]);
        }
    } else {
        array.push(["hset", key, field, object[field]]);
    }
}

dbUtil.getFieldValue = function(field, object) {
    var array = [];
    var obj = {};

    if(typeof object[field] == "object") {
        if(Object.prototype.toString.call(object[field]) === '[object Array]') {
            obj[field] = object[field];
            array.push({
                field: field,
                value: JSON.stringify(obj)
            });
        } else {
            array.push({
                field: field,
                value: JSON.stringify(object[field])
            });
        }
    } else {
        array.push({
            field: field,
            value: object[field]
        });
    }
    return array;
}

dbUtil.executeCommand = function(redis, redisConfig, array, obj, cb) {
    redis.command(function(client) {
        client.multi().select(redisConfig.database.SEAKING_REDIS_DB, function(err, reply) {
            client.multi(array).exec(function (err, replies) {
                redis.release(client);
                utils.invokeCallback(cb, null, {
                    obj: obj,
                    reply: replies
                });
            });
        }).exec(function (err, replies) {

        });
    });
}