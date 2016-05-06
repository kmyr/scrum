#!/usr/bin/env node
"use strict";

const cli = require("../lib/cli");
const commands = require("../lib/commands/index");

cli.main(commands);
