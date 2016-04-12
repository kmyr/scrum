"use strict";

function get() {
    return {
        "user": process.env.USER,
        "home": process.env.HOME,
        "pwd": process.env.PWD,
        "term": process.env.TERM,
        "shell": process.env.SHELL,
        "platform": process.platform,
        "pid": process.pid
    };
}

module.exports = {
    "get": get
};
