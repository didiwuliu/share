/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: ZhangChunsheng
 * Email: zhangchunsheng423@gmail.com
 * Date: 2014-05-21
 * Description: express.js
 */
var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});