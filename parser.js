
//let fs = require('fs')

function findRequireLine(code) {
    const regex = /^(\w+)\s*=\s*require\s*\(*"(\w+)"\)*$/;
    const lines = code.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const match = regex.exec(lines[i]);
        if (match) {
            const matchedLine = match[0];
            const variableName = match[1];
            const luaModuleName = match[2];
            return {matchedLine, variableName, luaModuleName};
        }
    }

    return null; // Return null if no matching line is found
}

function readFile(file) {
    let result;
    const f = new XMLHttpRequest();
    f.open("GET", file, false);
    f.onreadystatechange = function () {
        if (f.readyState === 4) {
            if (f.status === 200 || f.status === 0) {
                result = f.responseText;
            }
        }
    }
    f.send(null);
    return result;
}

function parseLuaFile(variableName, luaModuleName) {
    //let fs = require('fs')
    let content = readFile(luaModuleName + ".lua")
    //let content = fs.readFileSync(luaModuleName + ".lua", "utf8")
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const trimmedLine = lines[i].replace(/\s/g, '')
        //console.log(trimmedLine)
        if (trimmedLine === "local" + luaModuleName + "={}") {
            content = content.replaceAll(lines[i], lines[i].replaceAll(luaModuleName, variableName))
        } else if (trimmedLine.includes("function" + luaModuleName + ".")) {
            content = content.replaceAll(lines[i], lines[i].replaceAll(luaModuleName, variableName))
        } else if (trimmedLine === "return" + luaModuleName) {
            content = content.replaceAll(lines[i], "");
        }
    }
    return content;
}


function parseCode(code) {
    const {matchedLine, variableName, luaModuleName} = findRequireLine(code)
    const parsedModule = parseLuaFile(variableName, luaModuleName)
    return code.replaceAll(matchedLine, parsedModule)
}