"use strict";

const procs = require("../utils/procs");

module.exports = function (cli) {
    cli.route(/^do ([a-z-]+)$/, function (slug) {
        const action = scrumfile.action(slug, cli.scrumfiles);

        if (!action) {
            printing.error();
        } else {
            printing.normal(
                "Command executing",
                `Executing ${printing.highlight(slug)}, any output should appear below.`
            );
            const sh = procs.terminal("/bin/sh", ["-c", action.executes]);
            sh.stdout.pipe(process.stdout);
        }
    });
}