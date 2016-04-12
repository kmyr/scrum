#!/usr/bin/env node
"use strict";

const cli = require("../lib/utils/cli");
const commands = require("../lib/commands/index");

cli.main(commands);
