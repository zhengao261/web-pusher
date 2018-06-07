const fs = require("fs");
const path = require("path");
const fileIgnore = require('./file-ignore.js');
const utils = require('../utils/utils.js');

const FILE_IGNORES_ARR = fileIgnore['pusher-ignore'];
const TARGET_PATH = './target/target.txt';
const ROOT_DIR = process.cwd();
const BASE_DIR = '/' + ROOT_DIR.split('/')[ROOT_DIR.split('/').length - 1];
const OUT_PUT_FILE = `${ROOT_DIR}/output.json`;


// Traverse the folder and output the file tree
class W_output {
  constructor(receiver_url) {
    this.writeMapFile(receiver_url);
  }
  readDirSync(path, receiver_url) {

    const pa = fs.readdirSync(path);
    const me = this;
    pa.forEach(function (ele, index) {
      if (!utils.contains(FILE_IGNORES_ARR, ele)) {
        const info = fs.statSync(path + "/" + ele);
        if (info.isDirectory()) {
          me.readDirSync(path + "/" + ele, receiver_url)
        } else {
          fs.appendFileSync(OUT_PUT_FILE, `    "${path}/${ele}": "${receiver_url}",\n`); // 此处123 替换成服务器路径
        }

      }
    })
  }

  writeMapFile(receiver_url) {
    const time = `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`;
    fs.appendFileSync(OUT_PUT_FILE, `[{\n`);
    this.readDirSync(ROOT_DIR+'/src', receiver_url);
    fs.appendFileSync(OUT_PUT_FILE, `    "TIME_STAMP": "${new Date().getTime()}"`);
    fs.appendFileSync(OUT_PUT_FILE, `\n}]`);
  }

}

module.exports = W_output