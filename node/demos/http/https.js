/**
 * Created by zhang on 5/3/14.
 */
var https = require("https");
var fs = require("fs");

var options = {
    key: fs.readFileSync("../../key.pem"),
    cert: fs.readFileSync("../../cert.pem")
};

var server = https.createServer(options, function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
}).listen(8000);

console.log("https server start at port 8000...");