"use strict";

const procs = require("../utils/procs");

module.exports = function (cli) {
    cli.route(/^open ([a-z-]+)$/, function (session_name) {
        procs.terminal("screen", ["-x", session_name], cli.argv.env.cwd);
    });
}