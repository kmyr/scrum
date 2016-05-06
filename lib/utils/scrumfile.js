"use strict";

const path = require("path");
const fs = require("fs");

function get(path, file) {
    if (path && file) {
        const scrumfp = path.join(path, file);
        try {
            return fs.accessSync(scrumfp, fs.R_OK) && require(scrumfp);
        } catch (e) {}
    }
    return null;
}

function all(env, opt) {
    let argvpath = null, argvfile = null;
    if (opt.scrumfile) {
        argvpath = path.dirname(opt.scrumfile);
        argvfile = path.basename(opt.scrumfile);
    }

    return {
        "global": get("~/", "scrumfile.json"),
        "local": get(env.cwd, "scrumfile.json"),
        "argv": get(argvpath, argvfile)
    }
}

function session(session, scrumfiles) {
    if (scrumfiles.argv && scrumfiles.argv.sessions[session]) {
        return scrumfiles.argv.sessions[session];
    }

    if (scrumfiles.local && scrumfiles.local.sessions[session]) {
        return scrumfiles.local.sessions[session]
    }

    if (scrumfiles.global && scrumfiles.global.sessions[session]) {
        return scrumfiles.global.sessions[session];
    }

    return null;
}

module.exports = {
    "get": get,
    "all": all,
    "session": session
};
