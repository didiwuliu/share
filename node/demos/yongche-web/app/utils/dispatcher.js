/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-05-04
 * Description: channelUtil
 */
var crc = require('crc');

module.exports.dispatch = function(uid, connectors) {
    var index = Number(uid) % connectors.length;
    return connectors[index];
};
