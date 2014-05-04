/**
 * Created by zhang on 5/4/14.
 */
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var api = require('./routes/api');
// 加载hbs模块
var hbs = require('hbs');

var app = express();

// 加载数据模块
var blogEngine = require('./blog');

// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 3000);

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));

// 设定view engine变量，意为网页模板引擎
//app.set('view engine', 'jade');

// 指定模板文件的后缀名为html
app.set('view engine', 'html');
// 运行hbs模块
app.engine('html', hbs.__express);

//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// 设定静态文件目录，比如本地文件
// 目录为demo/public/images，访问
// 网址则显示为http://localhost:3000/images
app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/', function(req, res) {
    res.send('Hello World');
});*/

/*app.get('/', function(req, res){
    var body = 'Hello World';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
});*/

app.get('/api', function(request, response) {
    response.send({name:"张三",age:40});
});

app.get('/api', api.index);

/*app.get('/', function(req, res) {
    res.sendfile('./views/index.html');
});

app.get('/about', function(req, res) {
    res.sendfile('./views/about.html');
});

app.get('/article', function(req, res) {
    res.sendfile('./views/article.html');
});*/

/*app.get('/', function (req, res){
    res.render('index');
});
app.get('/about', function(req, res) {
    res.render('about');
});
app.get('/article', function(req, res) {
    res.render('article');
});*/

app.get('/', function(req, res) {
    res.render('index',{title:"最近文章", entries:blogEngine.getBlogEntries()});
});

app.get('/about', function(req, res) {
    res.render('about', {title:"自我介绍"});
});

app.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
});

app.listen(app.get('port'));

console.log("server start at " + app.get('port') + "...");