"use strict";

const package = require("../../package.json");
const latest = require("npm-latest");
const semver = require("semver");
const colors = require("colors");

module.exports = function register(cli) {
    cli.route(/^version$/, function () {
        return console.log(package.version);
    });

    cli.route(/^version latest$/, function () {
        latest("scrum", {"timeout": 3000}, function (err, npm) {
            if (err) {
                return console.error(err);
            } else if (semver.gt(npm.version, package.version)) {
                const message = [
                    colors.bold(colors.black(colors.bgWhite(" A new version is available "))),
                    colors.white(" \u2517 ") + colors.green(npm.version) + " > " + colors.red(package.version),
                    "   Run " + colors.yellow("npm update -g scrum") + " to update"
                ];
                return console.log(message.join("\n"));
            }
        });
    });
}
