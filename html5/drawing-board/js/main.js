$(function() {
    var app = new DrawingBoard();
    app.init();

    socket.on("draw point", function(data){
        console.log(data);

        app.canvas.stroke({
            pageX: data.x,
            pageY: data.y
        });
    });
});
