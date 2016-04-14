const colors = require("colors");

const STATUS = {
    "NORMAL": "White",
    "ATTENTION": "Yellow",
    "ERROR": "Red",
    "SUCCESS": "Green"
};

function headline(message, status) {
    const string = " " + message + " ";
    return colors.bold(colors.black(colors["bg" + status](string)));
}

function subheader(message, status) {
    return colors[status.toLowerCase()](" \u2517 ") + message;
}

function additional(message) {
    return "   " + message;
}

function assemble(status, first, second, ...rest) {
    if (!second) {
        return headline(first, status);
    } else {
        return [
            headline(first, status),
            subheader(second, status);
        ].concat(rest.map(additional)).join("\n");
    }
}

module.exports = {
    "mark": colors.yellow,
    "assemble": assemble
    "STATUS": STATUS
};

const messages = {
    "startSuccess": function (session_name) {
        return assembleLines.apply(null, [
            STATUS.NORMAL
            "GNU Screen session started",
            "Run " + action(`scrum open ${session_name}`) + " to attach to the session",
            "Detach at any time by pressing " + action("ctrl+a") + " followed by " + action("d")
        ]);
    },
    "startFailure":
};
