/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-05-04
 * Description: mysql
 */
var config = require('../.././mysql');
var mysql = require('mysql');

var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = pool;