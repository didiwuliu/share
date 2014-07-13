/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: ZhangChunsheng
 * Email: zhangchunsheng423@gmail.com
 * Date: 2014-05-18
 * Description: index.js
 */
var canvas;
var ctx; //2d画布
var screenWidth; //画布宽度
var screenHeight; //画布高度
var radius = 50; //初始圆半径
var step = 10; //每次半径递增大小
var winImg = new Image(); //胜利图片
var lostImg = new Image();//失败图片
var gameRunning = false; //游戏运行状态
var gameloopId; //记住循环的变量
var circle;

//公用 定义一个游戏物体戏对象
function GameObject() {
    this.x = 0;
    this.y = 0;
    this.radius = 50;
    this.color = '#ff8130';
    this.opacity = 1;
}

//定义圆 继承游戏对象GameObject
function Circle() {
    this.lineWidth = 1;
};
Circle.prototype = new GameObject(); //游戏对象GameObject

function gameLoop() {
    //清除屏幕
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    ctx.save();

    ctx.beginPath();
    //绘制圆
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.lineWidth = circle.lineWidth;
    ctx.strokeStyle = circle.color;
    ctx.stroke();
    ctx.fillStyle = circle.color;
    ctx.fill();

    ctx.restore();
}

//事件处理
function addEventHandlers() {
    canvas.addEventListener("click", function(e) {
        var x = e.x;
        var y = e.y;
        log("x: " + x + " " + (circle.x - circle.radius) + " " + (circle.x + circle.radius));
        log("y: " + y + " " + (circle.y - circle.radius) + " " + (circle.y + circle.radius));
        if(x >= circle.x - circle.radius && x <= circle.x + circle.radius
            && y >= circle.y - circle.radius && y <= circle.y + circle.radius) {
            circle.radius += step;
        }
    });
}

function log(info) {
    //console.log(info);
}

function loadImages() {
    gameLoop();
}

function initCircle() {
    circle = new Circle();
    circle.x = 120;
    circle.y = 200;
}

function enoughRadius() {
    if(circle.radius >= 600) {
        return true;
    }
    return false;
}

function toggleGameplay() {
    gameRunning = !gameRunning;
    if (gameRunning) {
        gameloopId = setInterval(gameLoop, 100);
    } else {
        clearInterval(gameloopId);
    }
}

function gameOver() {
    gameRunning = false;
    clearInterval(gameloopId);
    alert("游戏结束!");
}

function drawWin() {
    ctx.font = "12pt Arial";
    ctx.fillText("胜利", 250, 25);
}

function main() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d'); //获取2d画布
    screenWidth = parseInt(canvas.width); //画布宽度
    screenHeight = parseInt(canvas.height);
    //初始化圆
    initCircle();

    addEventHandlers(); //添加事件
    loadImages();

    toggleGameplay();
}

main();