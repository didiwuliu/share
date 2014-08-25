/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-05-04
 * Description: utils
 */
var message = require('../i18n/zh_CN.json');
var consts = require('../consts/consts');
var dataApi = require('./dataApi');
var Token = require('../../shared/token')
    , secret = require('../../config/session').secret;

var utils = module.exports;

/**
 * Check and invoke callback function
 * @param cb
 */
utils.invokeCallback = function(cb) {
    if(!!cb && typeof cb === 'function') {
        cb.apply(null, Array.prototype.slice.call(arguments, 1));
    }
}

/**
 * clone an object
 *
 * @param origin
 */
utils.clone = function(origin) {
    if(!origin) {
        return;
    }

    var obj = {};
    for(var f in origin) {
        if(origin.hasOwnProperty(f)) {
            obj[f] = origin[f];
        }
    }
    return obj;
}

utils.size = function(obj) {
    if(!obj) {
        return 0;
    }

    var size = 0;
    for(var f in obj) {
        if(obj.hasOwnProperty(f)) {
            size++;
        }
    }

    return size;
}

/**
 * 驗證用戶名
 */
utils.validLoginName = function(loginName) {
    if((loginName.length < 6) || (loginName.length > 16)) {
        return {
            validNum: 0,
            message: message.loginName_length
        };
    }
    var pattern=/[a-z,A-Z]+/;
    if(!pattern.test(loginName)) {
        return {
            validNum: -1,
            message: message.loginName_valid
        };
    }
    return {
        validNum: 1
    };
}

/**
 * 驗證密碼
 */
utils.validPassword = function(password) {
    if((password.length < 6) || (password.length > 16)) {
        return {
            validNum: 0,
            message: message.password_length
        };
    }
    return {
        validNum: 1
    };
}

/**
 * random
 * @param lower
 * @param higher
 * @returns {number}
 */
utils.random = function(lower, higher) {
    return Math.floor(Math.random() * (higher + 1 - lower)) + lower;
}

/**
 *
 * @param value
 * @param max
 * @returns {*}
 */
utils.getMax = function(value, max) {
    return value > max ? value : max;
}

utils.sortArray = function(array, sortBy, flag) {
    return array.sort(function(a, b) {
        if(a[sortBy] > b[sortBy]) {
            return flag ? -1 : 1;
        }
        if(a[sortBy] < b[sortBy]) {
            return flag ? 1 : -1;
        }
        return 0;
    });
}

utils.sort = function(array, sortBy) {
    var temp = {};
    for(var i = 0 ; i < array.length ; i++) {
        for(var j = i + 1 ; j < array.length ; j++) {
            if(array[j][sortBy] > array[i][sortBy]) {
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
}

/**
 * get userInfo by token
 * @param msg
 * @param req
 * @param res
 * @returns {*}
 */
utils.getUserInfo = function(msg, req, res) {
    var userInfo = {};
    if(typeof msg.token != "undefined") {
        userInfo = Token.parse(msg.token, secret);
        console.log(userInfo);
    } else {
        var headers = req.headers;
        if(typeof headers.signature == "undefined") {
            return null;
        }
        var signature = headers.signature;
        var test = Token.parseString(signature, secret);
        if(test.substr(5).length == 6) {
            var registerType = msg.registerType;
            var loginName = msg.loginName;
            userInfo = {
                registerType: registerType,
                loginName: loginName
            }
        } else {
            return null;
        }
    }
    return userInfo;
}

/**
 *
 * @param msg
 * @param res
 * @param data
 */
utils.send = function(msg, res, data) {
    if(typeof msg.jsoncallback == "undefined") {
        res.send(data);
    } else {
        res.send(msg.jsoncallback + "(" + JSON.stringify(data) + ")");
    }
}

utils.log = function(msg) {
    console.log(msg);
}

/**
 *
 * @param process
 */
utils.doProcess = function(process) {
    var argv = process.argv;
    var array = [];
    for(var i = 2 ; i < argv.length ; i++) {
        array = argv[i].split("=");
        if(array[0] == "env") {
            process.env.NODE_ENV = array[1];
        } else if(array[0] == "serverType") {
            process.env.SERVER_TYPE = array[1];
        } else if(array[0] == "port") {
            process.env.PORT = array[1];
        }
    }
}

/**
 * yyyy-MM-dd
 * @param date
 */
utils.getDaytime = function(date) {
    var month = date.getMonth();
    month = month + 1;
    if(month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if(day < 10) {
        day = "0" + day;
    }
    return date.getFullYear() + "-" + month + "-" + day;
}

utils.empty = function(obj) {
    return typeof obj == "undefined" || obj == null || obj == "";
}

utils.addOrigin = function(res, req) {
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Credentials', true);
    }
}

/**
 * 获得日期
 * @param time
 */
utils.getDate = function(time) {
    var date = new Date();
    date.setTime(time);
    return utils.getDaytime(date);
}