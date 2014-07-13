/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: ZhangChunsheng
 * Email: zhangchunsheng423@gmail.com
 * Date: 2014-07-14
 * Description: index.js
 */
var min_score = 0;
var max_score = 6;
var min_penalty_kick = 0;
var max_penalty_kick = 0;

var ROUND = {
    REGULAR_TIME: 1,
    EXTRA_TIME: 2,
    PENALTY_KICK: 3
};

$(document).ready(function() {
    $("#forecast").click(function(e) {
        var result = {
            isWin: 0,// <0 lost 0 > win
            regular_time_german_score: 0,
            regular_time_argentina_score: 0,
            extra_time_german_score: 0,
            extra_time_argentina_score: 0,
            penalty_kick_german_score: 0,
            penalty_kick_argentina_score: 0,
            total_german_score: 0,
            total_argentina_score: 0
        };

        fight(ROUND.REGULAR_TIME, result);

        if(result.isWin > 0) {
            setData(result);
            $("#result").html("德国胜，德国" + result.total_german_score + ":" + result.total_argentina_score + "阿根廷");
        } else if(result.isWin < 0) {
            setData(result);
            $("#result").html("阿根廷胜，阿根廷" + result.total_argentina_score + ":" + result.total_german_score + "德国");
        } else if(result.isWin == 0) {
            setData(result);
            $("#result").html("不可以平局啊");
        }
    });
});

function setData(result) {
    $("#regular_time_german").html(result.regular_time_german_score);
    $("#regular_time_argentina").html(result.regular_time_argentina_score);
    $("#extra_time_german").html(result.extra_time_german_score);
    $("#extra_time_argentina").html(result.extra_time_argentina_score);
    $("#penalty_kick_german").html(result.penalty_kick_german_score);
    $("#penalty_kick_argentina").html(result.penalty_kick_argentina_score);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fight(round, result) {
    if(round == ROUND.REGULAR_TIME) {
        result.regular_time_german_score = random(min_score, max_score);
        result.regular_time_argentina_score = random(min_score, max_score);

        result.total_german_score += result.regular_time_german_score;
        result.total_argentina_score += result.regular_time_argentina_score;

        result.isWin = result.total_german_score - result.total_argentina_score;
        if(result.isWin != 0) {
            return;
        } else {
            fight(ROUND.EXTRA_TIME, result);
        }
    } else if(round == ROUND.EXTRA_TIME) {
        result.extra_time_german_score = random(min_score, max_score);
        result.extra_time_argentina_score = random(min_score, max_score);

        result.total_german_score += result.extra_time_german_score;
        result.total_argentina_score += result.extra_time_argentina_score;

        result.isWin = result.total_german_score - result.total_argentina_score;
        if(result.isWin != 0) {
            return;
        } else {
            fight(ROUND.PENALTY_KICK, result);
        }
    } else if(round == ROUND.PENALTY_KICK) {
        result.penalty_kick_german_score += random(min_penalty_kick, max_penalty_kick);
        result.penalty_kick_argentina_score += random(min_penalty_kick, max_penalty_kick);

        result.total_german_score += result.penalty_kick_german_score;
        result.total_argentina_score += result.penalty_kick_argentina_score;

        result.isWin = result.total_german_score - result.total_argentina_score;
        if(result.isWin != 0) {
            return;
        } else {
            fight(ROUND.EXTRA_TIME, result);
        }
    }
}