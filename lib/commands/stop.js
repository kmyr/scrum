"use strict";

const procs = require("../utils/procs");
const printing = require("../utils/printing");

module.exports = function (cli) {
    cli.route(/^stop ([a-z-]+)$/, function (session_name) {
        procs.stdin(function (stdin, done) {
            stdin.write(`screen -S ${session_name} -X quit`);
            printing.normal(
                "GNU Screen session stopping",
                `Ran quit command against ${printing.mark(session_name)}`
            );
            done();
        });
    });
}
