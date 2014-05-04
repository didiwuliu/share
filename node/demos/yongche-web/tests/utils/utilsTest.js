/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-05-04
 * Description: testUtils
 */
var should = require('should');
var utils = require('../../app/utils/utils');

describe('utils test', function() {
    it('random', function() {
        console.log(utils.random(0, 1));
        utils.random(1, 1).should.equal(1);
    });
});