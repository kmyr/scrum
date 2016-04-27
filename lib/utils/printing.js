const colors = require("colors");

const highlight = colors.yellow;

const lookup = {
    "normal": {
        "foreground": "white",
        "background": "bgWhite"
    },
    "attention": {
        "foreground": "yellow",
        "background": "bgYellow"
    },
    "error": {
        "foreground", "red",
        "background": "bgRed"
    }
};

class Message {
    constructor(status, content) {
        this.content = [
            Message.first(status, content.shift()),
            Message.second(status, content.shift())
        ].concat(Message.rest(content));
    }

    static first(status, string) {
        return colors.bold(
            colors.black(
                colors[status.background](` ${string} `)
            )
        );
    }

    static second(status, string){
        return colors[status.foreground](" \u2517 ") + string;
    }

    static rest(strings) {
        return strings.map(function (str) {
            return `   ${str}`;
        });
    }

    toString() {
        return this.content.join("\n");
    }
}

function normal(...args) {
    const msg = new Message(lookup.normal, args);
    return console.log(msg.toString()) && msg;
}

function attention(...args) {
    const msg = new Message(lookup.attention, args);
    return console.log(msg.toString()) && msg;
}

function error(...args) {
    const msg = new Message(lookup.error, args);
    return console.log(msg.toString()) && msg;
}

module.exports = {
    "highlight": highlight,
    "normal": normal,
    "attention": attention,
    "error": error
};
