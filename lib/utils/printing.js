const colors = require("colors");

function assemble(color, first, second, ...rest) {
    rest = rest.map(function (str) {
        return "   " + str;
    });
    return [
        colors.bold(colors.black(colors["bg" + color](" " + first + " "))),
        colors[color.toLowerCase()](" \u2517 ") + second;
    ].concat(rest).join("\n");
}

function normal(...args) {
    return assemble.apply(this, args.unshift("White") && args);
}

function attention(...args) {
    return assemble.apply(this, args.unshift("Yellow") && args);
}

function error(...args) {
    return assemble.apply(this, args.unshift("Red") && args);
}


module.exports = {
    "highlight": colors.yellow,
    "normal": normal,
    "attention": attention,
    "error": error
};
