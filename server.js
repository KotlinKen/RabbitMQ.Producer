"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//const fs = require('fs');
var fs = __importStar(require("fs"));
var app = require('express')();
var amqp = require('amqplib/callback_api');
console.log('test');
var moment = require('moment');
require('console-stamp')(console, { pattern: 'yyyy-mm-dd HH:MM:ss.l' });
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var gch = null;
var amqpService = function () {
    amqp.connect(config.url, amqpConnectionHandler);
};
var amqpConnectionHandler = function (e, conn) {
    if (e)
        throw e;
    conn.createChannel(channelCallbackHandler);
};
var channelCallbackHandler = function (e, ch) {
    ch.assertExchange(config.assert.exchange, config.assert.type, config.assert.options);
    gch = ch;
};
amqpService();
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.get('/message/:machine/:emoji', function (req, res) {
    console.log("machine", req.params.machine);
    console.log("emoji", req.params.emoji);
    console.log("req.params", req.params);
    if (triggerMessage(req.params.machine, req.params.emoji)) {
        res.send("success");
    }
    else {
        ;
        res.send("fail");
    }
});
var triggerMessage = function (severity, emoji) {
    console.log('emoji :>> ', emoji, severity);
    // console.log('gch :>> ', gch);
    var created_date = moment().format('YYYY-MM-DD HH:mm:ss');
    if (gch != null)
        gch.publish(config.assert.exchange, severity, Buffer.from(emoji));
    return true;
};
app.listen(config.api.port, function () {
    console.log("1234");
    console.log('Restful API Server started and listening on port', config.api.port);
});
//# sourceMappingURL=server.js.map