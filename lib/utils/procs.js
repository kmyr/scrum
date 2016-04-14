"use strict";

const child_process = require("child_process");

function stdin(writer) {
    const sh = child_process.spawn("sh")
    writer(sh.stdin, function () {
        sh.stdin.end();
    });
}

function terminal(command, parameters, cwd) {
    child_process.spawn(command, parameters, {"cwd": cwd, "stdio": "inherit"});
}

module.exports = {
    "stdin": stdin,
    "terminal": terminal
};
