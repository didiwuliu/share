/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: ZhangChunsheng
 * Email: zhangchunsheng423@gmail.com
 * Date: 2014-05-18
 * Description: index.js
 */
var DI = (function() {
    var DI = {
        isDebug: false,
        canvas: null,
        context: null,
        lang: null,
        canUseLang: {
            'en' : 'en_US',
            'zh' : 'zh_TW',
            'de' : 'de_DE',
            'es' : 'es_ES',
            'fr' : 'fr_FR',
            'it' : 'it_IT',
            'ja' : 'ja_JP',
            'ko' : 'ko_KR',
            'pt' : 'pt_BR',
            'ru' : 'ru_RU',
            'zh-cn':'zh_CN'
        },
        board: {
            mouseX: 100,
            mouseY: 100,
            angle: 0,
            radius: 0,
            ballstyle: '.',
            ballcolor: '#FF0000',
            allzindex: 0,
            opos: {} //old position
        },
        offset: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        sceneSize: {
            width: 480,
            height: 320
        },
        deviceType: "pc",
        enums: {
            deviceType: {
                touch: 1,
                pc: 2
            }
        },
        sys: {
            fps: 60
        }
    };

    return DI;
})();

window.DI = DI;

(function(DI) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    var _lang = (navigator.language || navigator.browserLanguage).toLowerCase();
    _lang = (_lang === 'zh-cn') ? 'zh-cn' : _lang.slice(0, _lang.indexOf("_"));
    DI.lang =  DI.canUseLang[_lang] || 'en_US';

    /**
     * init
     */
    DI.init = function() {
        DI.canvas = canvas;
        DI.context = context;

        //DI.drawTest(DI.context);

        document.documentElement.onmousemove = function(e) {
            DI.setXY(e);
        }
    };

    DI.gameLoop = function() {

    };

    DI.setXY = function(e) {
        var pos = DI.mousePos(e);
        mouseX = pos.x;
        mouseY = pos.y;

        DI.drawLine(pos);

        DI.board.opos = pos;
    };

    DI.drawDOM = function() {
        ball = document.createElement("p");
        ball.style.position = "absolute";
        ball.style.color = DI.board.ballcolor;
        ball.style.zIndex = DI.board.allzindex + 1;
        ball.innerHTML = DI.board.ballstyle;
        document.body.appendChild(ball);
        document.all.selected = false;

        ball.style["left"] = mouseX + "px";
        ball.style["top"] = mouseY + "px";
    };

    DI.drawLine = function(npos) {
        if(DI.board.opos) {
            DI.context.beginPath();
            // Start from the top-left point.

            DI.context.moveTo(DI.board.opos.x, DI.board.opos.y);
            DI.context.lineTo(npos.x, npos.y);

            DI.context.stroke();
            DI.context.closePath();
        }
    };

    DI.mousePos = function(e) {
        var x,y;
        if(!document.all) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = event.clientX + document.documentElement.scrollLeft;
            y = event.clientY + document.documentElement.scrollTop;
        }
        return {
            x: x,
            y: y
        };
    };

    DI.drawTest = function(context) {
        context.lineWidth = 5;          //定义线条宽度
        context.strokeStyle = "red";    //定义线条颜色
        context.moveTo(100, 100); //起始位置
        context.lineTo(200, 200); //终止位置
        context.stroke();               //结束图形
    };
    return DI;
})(DI);

DI.init();
