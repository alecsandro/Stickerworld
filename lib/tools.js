const config = require("../config.json");
const fs = require('fs');
const util = require('util');
const glob = require('fast-glob');
const crypto = require("crypto");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFileSync);
const renameFile = util.promisify(fs.renameSync);

async function cleanFileTemp(id) {
    const search_dir = await glob(`./temp/*${id}*`, { dot: true, onlyFiles: false, markDirectories: true });
    search_dir.forEach(async (elem) => {
        if (elem[elem.length - 1] === "/") {
            await fs.rmdirSync(elem, {
                recursive: true
            });
        }
    });

    const search_files = await glob(`./temp/*${id}*`, { dot: true, onlyFiles: true, markDirectories: false });

    search_files.forEach((elem) => {
        fs.unlinkSync(elem);
    });

}

function genId() {
    return crypto.randomBytes(16).toString("hex");
}

function conlog_info(str) {
    if (config.debug) {
        console.log(str);
    }
    global.log.info(str);
}

function conlog_info_force(str) {
    console.log(str);
    global.log.info(str);
}

function conlog_error(str) {
    console.log(str);
    global.log.error(str);
}

function bytesToMegas(num) {
    return num / Math.pow(1024, 2);
}

function getExtensionFile(str) {
    return str.split(".").pop();
}

module.exports = {
    writeFile,
    readFile,
    renameFile,
    cleanFileTemp,
    genId,
    conlog_info,
    conlog_info_force,
    conlog_error,
    bytesToMegas,
    getExtensionFile
};