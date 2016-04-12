"use strict";

const child_process = require("child_process");

function stdin(g) {
    const sh = child_process.spawn("sh");
    for (let line of g()) {
        sh.stdin.write(line);
    } return sh.stdin.end();
}

function terminal(command, parameters, cwd) {
    child_process.spawn(command, parameters, {"cwd": cwd, "stdio": "inherit"});
}

module.exports = {
    "stdin": stdin,
    "terminal": terminal
};