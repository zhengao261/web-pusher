const fs = require("fs");
const path = require("path");
const Log = require('./BaseUtils/base-log.js');
const fileIgnore = require('./config/config.js');
const utils = require('./BaseUtils/utils.js');

const FILE_IGNORES_ARR = fileIgnore['pusher-ignore'];
const BaseLog = Log().base_log;
const TARGET_PATH = './target/target.txt';
const ROOT_DIR = path.join(__dirname);
const BASE_DIR = '/' + ROOT_DIR.split('/')[ROOT_DIR.split('/').length - 1];
const OUT_PUT_FILE = `${ROOT_DIR}/output.json`;

// Traverse the folder and output the file tree
// const fileArr = [];

const readDirSync = function (path) {
    const pa = fs.readdirSync(path);
    pa.forEach(function (ele, index) {
        if (!utils.contains(FILE_IGNORES_ARR, ele)) {
            const info = fs.statSync(path + "/" + ele);
            if (info.isDirectory()) {
                readDirSync(path + "/" + ele)
            } else {
                fs.appendFileSync(OUT_PUT_FILE,`    "${path}/${ele}": "123",\n`); // 此处123 替换成服务器路径
            }

        }
    })
}
// console.log(JSON.stringify(fileArr, null, 2));
const writeFile = function() {
    fs.appendFileSync(OUT_PUT_FILE,`[{\n`);
    readDirSync(ROOT_DIR);
    fs.appendFileSync(OUT_PUT_FILE,`    "TIMESTAMP": "${new Date()}"`);
    fs.appendFileSync(OUT_PUT_FILE,`\n}]`);
}
writeFile();