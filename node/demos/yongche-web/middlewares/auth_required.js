/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-05-04
 * Description: auth_required
 */
var utils = require('../app/utils/utils');
var Code = require('../shared/code');

module.exports = function (req, res, next) {
    var msg = req.query;

    utils.addOrigin(res, req);

    if (req.session.uid) {
        return next();
    }

    var accept = req.headers.accept || '';
    var data = {};
    // html
    if (~accept.indexOf('json')) {
        res.statusCode = 403;
        data = {
            code: 403
        }
        utils.send(msg, res, data);
    } else {
        data = {
            code: Code.NO_LOGIN
        }
        utils.send(msg, res, data);
    }
};