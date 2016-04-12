"use strict";

const init = require("./init");
const version = require("./version");
const start = require("./start");
const open = require("./open");
const stop = require("./stop");

module.exports = [
    init,
    version,
    start,
    open,
    stop
];
