/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: ZhangChunsheng
 * Email: zhangchunsheng423@gmail.com
 * Date: 2014-05-21
 * Description: server.js
 */

var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs')

app.listen(3000);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
    function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

io.sockets.on('connection', function (socket) {//connect message disconnect
    socket.emit('news', {
        hello: 'world'
    });

    socket.emit('connection', {
        connect: 'connect'
    });

    socket.on('my other event', function (data) {
        console.log(data);
    });

    io.sockets.emit('this', {
        will: 'be received by everyone'
    });

    socket.on('point', function(data) {
        console.log(data);
    });

    socket.on('private message', function (from, msg) {
        console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', function () {
        io.sockets.emit('user disconnected');
        io.sockets.emit('disconnected');
    });

    socket.on('set nickname', function (name) {
        socket.set('nickname', name, function () {
            socket.emit('ready');
        });
    });

    socket.on('msg', function () {
        socket.get('nickname', function (err, name) {
            console.log('Chat message by ', name);
        });
    });

    socket.broadcast.emit('user connected');
});

/*var chat = io
    .of('/chat')
    .on('connection', function (socket) {
        socket.emit('a message', {
            that: 'only'
            , '/chat': 'will get'
        });
        chat.emit('a message', {
            everyone: 'in'
            , '/chat': 'will get'
        });
    });*/

/*var news = io
    .of('/news')
    .on('connection', function (socket) {
        socket.emit('item', { news: 'item' });
    });*/