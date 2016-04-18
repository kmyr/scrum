"use strict";

const fs = require("fs");
const path = require("path");
const colors = require("colors");
const scrumfile = require("../utils/scrumfile.js");
const printing = require("../utils/printing.js");

module.exports = function register(cli) {
    cli.route(/^init$/, function () {
        if (!scrumfile.get(cli.argv.env.cwd, "scrumfile.json")) {
            fs.writeFile(path.join(cli.argv.env.cwd + "scrumfile.json"), contents, function () {
                if (err) {
                    return printing.error(
                        "Initialization failed",
                        `Could not create scrumfile.js in ${printing.highlight(cli.argv.env.cwd)}`,
                        err
                    );
                } else {
                    return printing.normal(
                        "Initialized successfully",
                        `Created scrumfile.js in ${printing.highlight(cli.argv.env.cwd)}`
                    )
                }
            });
        } else {
            return printing.attention(
                "Already initialized",
                `There is already a scrumfile in ${printing.highlight(cli.argv.env.cwd)}`
            )
        }
    });
}
