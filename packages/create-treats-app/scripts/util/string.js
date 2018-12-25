const logger = require("./logger"),
    vm = require("vm"),
    re = /<%(.+?)?%>/g,
    codeWithDelimiter = /(^( )?(if|for|else))(.*)?/g,
    specialSyntax = /(else|endif|elsif|endfor)/g,
    specialSyntaxMap = {
        elsif: "} else if",
        else: "} else {",
        endif: "}",
        endfor: "}"
    };

const templateParser = (str, params, opts = {}) => {
    let code,
        cursor = 0,
        match = null;
    code = "var r=[];\n";
    const add = (line, js) => {
        if (js === true) {
            let currMatch;
            currMatch = line.match(specialSyntax);
            if (!opts.injectValueOnly) {
                if (currMatch) {
                    currMatch.forEach(item => {
                        line = line.replace(item, specialSyntaxMap[item]);
                        if (item === "elsif") {
                            line += "{";
                        }
                    });
                    code += `${line}`;
                    return add;
                }
                currMatch = line.match(codeWithDelimiter);
                if (currMatch) {
                    code += `${line}{`;
                    return add;
                }
            }
            code += `r.push(${line});`;
        } else {
            code +=
                line !== ""
                    ? `r.push("${line.replace(/"/g, '\\"').replace(/[\n]/g, "\\n")}");`
                    : "";
        }
        return add;
    };
    match = re.exec(str);
    while (match) {
        add(str.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
        match = re.exec(str);
    }

    add(str.substr(cursor, str.length - cursor));
    code += 'var returnData = r.join("");';
    logger("debug", code);
    code = code.replace(/[\r\t\n]/g, "");
    const context = { ...params };
    vm.createContext(context);
    vm.runInContext(code, context);
    const { returnData } = context;
    return returnData;
};

module.exports = {
    templateParser
};
