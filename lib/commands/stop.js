"use strict";

const procs = require("../utils/procs");
const printing = require("../utils/printing");

module.exports = function (cli) {
    cli.route(/^stop ([a-z-]+)$/, function (slug) {
        procs.stdin(function (stdin, done) {
            stdin.write(`screen -S ${slug} -X quit`);
            printing.normal(
                "GNU Screen session stopping",
                `Ran ${printing.highlight("-X quit")} against ${printing.highlight(session_name)}`
            );
            done();
        });
    });
}
