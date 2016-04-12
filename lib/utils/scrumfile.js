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

function session(session_name, scrumfiles) {
    if (scrumfiles.argv && scrumfiles.argv.sessions[session_name]) {
        return scrumfiles.argv.sessions[session_name];
    }

    if (scrumfiles.local && scrumfiles.local.sessions[session_name]) {
        return scrumfiles.local.sessions[session_name]
    }

    if (scrumfiles.global && scrumfiles.global.sessions[session_name]) {
        return scrumfiles.global.sessions[session_name];
    }

    return null;
}

module.exports = {
    "get": get,
    "all": all,
    "session": session
};
