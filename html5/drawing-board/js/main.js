$(function() {
    var app = new DrawingBoard();
    app.init();

    if(socket) {
        socket.on("init", function(data) {
            var points = data.points;
            for(var i = 0 ; i < points.length ; i++) {
                app.canvas.setColor(points[i].color);
                app.canvas.stroke({
                    pageX: points[i].x,
                    pageY: points[i].y
                });
            }
        });

        socket.on("draw point", function(data) {
            console.log(data);

            app.canvas.setColor(data.color);
            app.canvas.stroke({
                pageX: data.x,
                pageY: data.y
            });
        });

        socket.on("clear", function() {
            app.canvas.resizeCanvas();
        });
    }
});
