"use strict";

const procs = require("../utils/procs");

module.exports = function (cli) {
    cli.route(/^stop ([a-z-]+)$/, function (session_name) {
        procs.stdin(function* () {
            yield `screen -S ${session_name} -X quit`;
        });
    });
}