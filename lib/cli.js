"use strict";

const routing = require("./utils/routing");
const argv = require("./utils/argv");
const scrumfile = require("./utils/scrumfile");

class CommandLineInterface extends routing.Router {
    constructor(commands) {
        super();

        this.argv = argv.get();
        this.scrumfiles = scrumfile.all(this.argv.env, this.argv.opt);

        commands.forEach((register) => {
            register(this);
        });
    }

    getTemplateContext() {
        return {
            "env": this.argv.env,
            "opt": this.argv.opt
        }
    }

    static main(commands) {
        const cli = new CommandLineInterface(commands);

        if (cli.accepts(cli.argv.cmd)) {
            cli.follow();
        } return cli;
    }
}

module.exports = {
    "main": CommandLineInterface.main
};
