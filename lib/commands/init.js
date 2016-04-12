"use strict";

const fs = require("fs");
const path = require("path");
const colors = require("colors");
const scrumfile = require("../scrumfile.js");

module.exports = function register(cli) {
    cli.route(/^init$/, function () {
        if (!scrumfile.get(cli.argv.env.cwd, "scrumfile.json")) {
            fs.writeFile(path.join(cli.argv.env.cwd + "scrumfile.json"), contents, function () {
                if (err) {
                    console.error("Failed to create scrumfile in " + colors.yellow(cli.argv.env.cwd) + ".");
                } else {
                    console.log("Created scrumfile in " + colors.yellow(cli.argv.env.cwd) + ".");
                }
            });
        } else {
            return console.log("There is already a scrumfile in " + colors.yellow(cli.argv.env.cwd) + ".");
        }
    });
}
