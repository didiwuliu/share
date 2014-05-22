/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: ZhangChunsheng
 * Email: zhangchunsheng423@gmail.com
 * Date: 2014-05-22
 * Description: drawing_board.js
 */
(function (window) {
    var DrawingBoard = function () {
        var canvas = new Canvas();
        var colorSelector = new ColorSelector(canvas);
        var clearButton = new ClearButton(canvas);

        this.canvas = canvas;
        this.colorSelector = colorSelector;
        this.clearButton = clearButton;

        this.init = function () {
            canvas.init();
            canvas.resizeCanvas();
            colorSelector.init();
            clearButton.init();
            $(window).resize(canvas.resizeCanvas);
        };
    };

    var Canvas = function () {
        var drawingArea = $("#drawing-area");
        var $canvas = drawingArea.find("canvas");
        var canvasEl = $canvas[0];
        var ctx = canvasEl.getContext("2d");

        this.init = function () {
            $canvas.bind(new CanvasEventHandler(this));
        }

        this.resizeCanvas = function () {
            canvasEl.width = drawingArea.width();
            canvasEl.height = drawingArea.height();
        }

        this.setColor = function (color) {
            ctx.fillStyle = color;
        };

        this.stroke = function (e) {
            ctx.beginPath();
            ctx.arc(e.pageX, e.pageY, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        };
    };

    var CanvasEventHandler = function (canvas) {
        var drawing = false;

        this.mousedown = function (e) {
            drawing = true;
            canvas.stroke(e);
            return false;
        };

        this.mousemove = function (e) {
            if (drawing) {
                if(socket) {
                    socket.emit("point", {
                        x: e.pageX,
                        y: e.pageY
                    });
                }
                canvas.stroke(e);
            }
        };

        this.mouseup = function (e) {
            drawing = false;
        };
    };

    var ColorSelector = function (canvas) {
        var colorSelector = $("#color-selector");

        this.init = function () {
            colorSelector.find(".button").click(function () {
                var self = $(this);
                colorSelector.children().removeClass("selected");
                self.addClass("selected");
                canvas.setColor(self.css("background-color"));
            });
        };
    };

    var ClearButton = function (drawingCanvas) {
        var $clearCanvas = $("#clear-button canvas");
        var clearCanvas = $clearCanvas[0];
        var ctx = clearCanvas.getContext("2d");

        var drawLine = function (x1, y1, x2, y2) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        };

        var render = function () {
            ctx.strokeStyle = "#F00";
            ctx.lineWidth = 2;
            drawLine(0, 0, 60, 60);
            drawLine(0, 60, 60, 0);
        };

        this.init = function () {
            render();
            $clearCanvas.click(drawingCanvas.resizeCanvas);
        };
    };

    window.DrawingBoard = DrawingBoard;
})(window);