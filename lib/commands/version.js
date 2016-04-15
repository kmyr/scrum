"use strict";

const package = require("../../package.json");
const latest = require("npm-latest");
const semver = require("semver");
const colors = require("colors");
const printing = require("../utils/printing");

module.exports = function register(cli) {
    cli.route(/^version$/, function () {
        return console.log(package.version);
    });

    cli.route(/^version latest$/, function () {
        latest("scrum", {"timeout": 3000}, function (err, npm) {
            if (err) {
                if (err.message) {
                    err = err.toString();
                }
                const output = printing.error(
                    "Failed to find latest version",
                    `Query by ${printing.highlight("npm-latest")} returned ${JSON.stringify(err)}`
                );
                console.log(output);
            } else if (semver.gt(npm.version, package.version)) {
                const output = printing.attention(
                    "A new version is available",
                    `Run ${printing.highlight("npm update -g scrum")} to update from ${printing.highlight(npm.version)} to ${printing.highlight(package.version)}`
                );
                console.log(output);
            }
        });
    });
}
