"use strict";

const minimist = require("minimist");

function get() {
    const min = minimist(process.argv.slice(2));
    const cmd = min._.join(" ");
    delete min._;
    return {
        cmd: cmd,
        opt: min
    }
}

module.exports = {
    "get": get
};
