/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: ZhangChunsheng
 * Email: zhangchunsheng423@gmail.com
 * Date: 2014-05-22
 * Description: drawing_board.js
 */
(function (window) {
    /**
     * Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_2 like Mac OS X; zh-cn) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5
     *
     * Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; zh-cn) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5
     *
     * MQQBrowser/25 (Linux; U; 2.3.3; zh-cn; HTC Desire S Build/GRI40;480*800)
     *
     * Mozilla/5.0 (Linux; U; Android 2.3.3; zh-cn; HTC_DesireS_S510e Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
     *
     * Mozilla/5.0 (SymbianOS/9.3; U; Series60/3.2 NokiaE75-1 /110.48.125 Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/413 (KHTML, like Gecko) Safari/413
     *
     * Mozilla/5.0 (iPad; U; CPU OS 4_3_3 like Mac OS X; zh-cn) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile/8J2
     *
     * Mozilla/5.0 (Windows NT 5.2) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.122 Safari/534.30
     *
     * Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1
     *
     * Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/534.51.22 (KHTML, like Gecko) Version/5.1.1 Safari/534.51.22
     *
     * Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A5313e Safari/7534.48.3
     *
     * Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A5313e Safari/7534.48.3
     *
     * Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A5313e Safari/7534.48.3
     *
     * Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1
     *
     * Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; SAMSUNG; OMNIA7)　　　　　　----SAMSUNG MP7
     *
     * Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; XBLWP7; ZuneWP7)  　　　　　　　　----HTC MP7
     *
     * @returns {boolean}
     */
    function isMobile() {
        var flag = false;

        var keywords = ["Android", "iPhone", "iPod", "iPad", "Windows Phone", "MQQBrowser"];

        var agent = navigator.userAgent;
        if (agent.indexOf("Windows NT") < 0 || (agent.indexOf("Windows NT") >= 0 && agent.indexOf("compatible; MSIE 9.0;") >= 0)) {
            //排除 苹果桌面系统
            if (agent.indexOf("Windows NT") < 0 && agent.indexOf("Macintosh") < 0) {
                for (var keyword in keywords) {
                    if (agent.indexOf(keyword) >= 0) {
                        flag = true;
                        break;
                    }
                }
            }
        }

        return flag;
    }

    function getPlatform() {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            return "ios";
        } else if (/(Android)/i.test(navigator.userAgent)) {
            return "android";
        } else {
            return "pc";
        };
    }

    var platform = getPlatform();

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

        this.ctx = ctx;

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

        this.getColor = function() {
            return ctx.fillStyle;
        }

        this.stroke = function (e) {
            ctx.beginPath();
            ctx.arc(e.pageX, e.pageY, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        };
    };

    var CanvasEventHandler = function (canvas) {
        var drawing = false;

        var mouseDown = "mousedown";
        var mouseMove = "mousemove";
        var mouseUp = "mouseup";

        if(platform == "android" || platform == "ios") {
            mouseDown = "touchstart";
            mouseMove = "touchmove";
            mouseUp = "touchend";

            document.getElementById("canvas").addEventListener(mouseDown, function(touchEvent) {
                drawing = true;
                var e = touchEvent.touches[0];
                send(e);
                canvas.stroke(e);
                touchEvent.preventDefault();//important
            });

            document.getElementById("canvas").addEventListener(mouseMove, function(touchEvent) {
                if (drawing) {
                    var e = touchEvent.touches[0];
                    send(e);
                    canvas.stroke(e);
                }
            });

            document.getElementById("canvas").addEventListener(mouseUp, function(touchEvent) {
                drawing = false;
            });
        } else {
            this[mouseDown] = function (e) {
                drawing = true;
                send(e);
                canvas.stroke(e);
                return false;
            };

            this[mouseMove] = function (e) {
                if (drawing) {
                    send(e);
                    canvas.stroke(e);
                }
            };

            this[mouseUp] = function (e) {
                drawing = false;
            };
        }

        function send(e) {
            if(socket) {
                socket.emit("point", {
                    x: e.pageX,
                    y: e.pageY,
                    color: canvas.ctx.fillStyle
                });
            }
        }
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
            $clearCanvas.click(function() {
                if(socket) {
                    socket.emit("clear");
                }
                drawingCanvas.resizeCanvas();
            });
        };
    };

    window.DrawingBoard = DrawingBoard;
})(window);