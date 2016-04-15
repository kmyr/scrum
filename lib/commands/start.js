"use strict";

const handlebars = require("handlebars");
const procs = require("../utils/procs");
const scrumfile = require("../utils/scrumfile");
const printing = require("../utils/printing");

module.exports = function (cli) {
    cli.route(/^start ([a-z-]+)$/, function (session_name) {
        procs.stdin(function (stdin, done) {
            const context = cli.getTemplateContext();
            const session = scrumfile.session(session_name, cli.scrumfiles);

            if (session) {
                stdin.write(`screen -dmS ${session_name}\n`);

                session.windows.forEach(function (w) {
                    const to_run = handlebars.compile(w.run)(context)
                    stdin.write(`screen -S ${session_name} -X screen -t \"${w.title}\" sh -c \"${to_run}\"\n`);
                });

                setTimeout(function () {
                    stdin.write(`screen -S ${session_name} -p 0 -X stuff $'exit\n'\n`);
                    const output = printing.normal(
                        "GNU Screen session started",
                        `Run ${printing.highlight("scrum open " + session_name})} to attach to the session`,
                        `Detach at any time by pressing ${printing.highlight("ctrl+a")} followed by ${printing.highlight("d")}`
                    );
                    console.log(output);
                    done();
                }, 384);
            } else {
                const output = printing.error(
                    "GNU Screen session failed to start",
                    `No session named ${printing.highlight(session_name)} could be found in the active scrumfiles`
                );
                console.log(output);
                done();
            }
        });
    });
}
