/**
 * Created by zhang on 5/3/14.
 */
var EventEmitter = require("events").EventEmitter;

var ee = new EventEmitter();
ee.on("someEvent", function() {
    console.log("event has occured");
});

ee.emit("someEvent");