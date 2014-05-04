/**
 * Copyright(c)2014,Luomor,www.luomor.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-05-04 14:47
 * Description: routes
 */
var routes = require('./routes')
    , auth = require('./routes/auth')
    , authRequired = require('./middlewares/auth_required');

module.exports = function (app) {
    app.get('/', authRequired, routes.index);
    app.get('/index', authRequired, routes.index);

    app.get('/auth', auth.auth);
}