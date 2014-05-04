/**
 * Copyright(c)2013,Luomor,www.luomor.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-05-04
 * Description: code
 */
module.exports = {
    OK: 200,
    FAIL: 500,
    ARGUMENT_EXCEPTION: 101,
    NO_LOGIN: 102,

    ENTRY: {
        FA_TOKEN_ILLEGAL: 1000,
        FA_TOKEN_INVALID: 1001,
        FA_TOKEN_EXPIRE: 	1002,
        FA_USER_NOT_EXIST: 1003
    },

    GATE: {
        FA_NO_SERVER_AVAILABLE: 2001
    },

    CHAT: {
        FA_CHANNEL_CREATE: 3001,
        FA_CHANNEL_NOT_EXIST: 3002,
        FA_UNKNOWN_CONNECTOR: 3003,
        FA_USER_NOT_ONLINE: 	3004
    }
};