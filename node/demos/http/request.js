/**
 * Created by zhang on 5/3/14.
 */
var http = require('http');

var options = {
    host: 'www.random.org',
    path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
}

var callback = function(response) {
    var str = '';
    //another chunk of data has been received, so append it to `str`
    response.on('data', function(chunk) {
        str += chunk;
    });
    //the whole response has been received, so we just print it out here
    response.on('end', function() {
        console.log("your number is:" + str);
    });
}

var req = http.request(options, callback);
req.write("hello world!");
req.end();