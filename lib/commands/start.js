"use strict";

const handlebars = require("handlebars");
const procs = require("../utils/procs");
const scrumfile = require("../utils/scrumfile");

module.exports = function (cli) {
    cli.route(/^start ([a-z-]+)$/, function (session_name) {
        procs.stdin(function* () {
            const context = cli.getTemplateContext();
            const session = scrumfile.session(session_name, cli.scrumfiles);

            if (session) {
                yield `screen -dmS ${session_name}\n`;

                let index = 0;
                for (index; index < session.windows.length; index++) {
                    const w = session.windows[index];
                    const execs = handlebars.compile(w.execs)(context);

                    yield `screen -S ${session_name} -X screen -t \"${w.title}\" sh -c \"${execs}\"\n`;
                }
                // the below should actually work, but may require more time?
                // if we want to do it with a timeout, we will need to not use a generator.
                yield `screen -S ${session_name} -p 0 -X stuff $'exit\n'\n`;

                const message = [
                    colors.bold(colors.black(colors.bgWhite(" GNU Screen session started "))),
                    " \u2517 Run " + colors.green(`scrum open ${session_name}`) + " to attach to the session",
                    "   Detach at any time by pressing " + colors.yellow("ctrl+a") + " followed by " + colors.yellow("d"),
                ];
                console.log(message.join("\n"));
            } else {

            }
        });
    });
}
