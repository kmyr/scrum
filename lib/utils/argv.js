"use strict";

const minimist = require("minimist");
const env = require("./env");

function get() {
    const min = minimist(process.argv.slice(2));
    const cmd = min._.join(" ");
    delete min._;
    return {
        "cmd": cmd,
        "opt": min,
        "env": env.get()
    }
}

module.exports = {
    "get": get
};
