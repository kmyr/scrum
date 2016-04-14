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
                    const output = printing.assemble(
                        printing.STATUS.NORMAL,
                        "GNU Screen session started",
                        `Run ${printing.mark("scrum open " + session_name})} to attach to the session`,
                        `Detach at any time by pressing ${printing.mark("ctrl+a")} followed by ${printing.mark("d")}`
                    )
                    console.log(output);
                    done();
                }, 256);
            } else {
                const output = printing.assemble(
                    printing.STATUS.ERROR,
                    "GNU Screen session failed to start".
                    `No session named ${printing.mark(session_name)} could be found in the active scrumfiles`
                );
                console.log(output);
                done();
            }
        });
    });
}
