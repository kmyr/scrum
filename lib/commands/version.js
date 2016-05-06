"use strict";

const package = require("../../package.json");
const latest = require("npm-latest");
const semver = require("semver");
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
                return printing.error(
                    "Failed to find latest version",
                    `Query by ${printing.highlight("npm-latest")} returned ${JSON.stringify(err)}`
                );
            } else if (semver.gt(npm.version, package.version)) {
                return printing.attention(
                    "A new version is available",
                    `Run ${printing.highlight("npm update -g scrum")} to update from ${printing.highlight(npm.version)} to ${printing.highlight(package.version)}`
                );
            }
        });
    });
}
