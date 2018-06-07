#!/usr/bin/env node

var ROOT_DIR = process.cwd();
var path = require("path");
var deploy = require(`${ROOT_DIR}/webpusher-hosts.json`);
var colors = require('colors');

// colorful font console
console.log(require('figlet').textSync('web-pusher'));
console.log("[info] Version: v" + require("../package.json").version + " welcome to use it !");
var yargs = require("yargs")
  .usage("webpusher " + require("../package.json").version + "\n" +
    "Usage: https://github.com/zhengao261/web-pusher\n" +
    "Usage with config file: webpusher <release> [<release>]")
  .example('webpusher --release http://www.example.com/receiver.js')
  .example('webpusher --release=[hostname]')
  .epilog('copyright by zhengao 2018')

require("./config-yargs")(yargs);
var argv = yargs.argv;
var role = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
var receiver_url, // rd receiver.js 路径
    target_url; // receiver + root

if (role.test(argv.release)) {
  receiver_url = target_url = argv.release;
} else {
  for (var k in deploy) {
    var RD = deploy[argv.release];
    if (argv.release === k) {
      receiver_url = RD.receiver
      target_url = RD.receiver + RD.root
    }
  }
}
if (typeof receiver_url === 'undefined') {
  console.log(`[warn] ${argv.release} 's hosts is not undefined`.yellow);
} else {
  console.log(`[info] Host: ${receiver_url} is ready`);
}
// 准备开始： 先清理 output.json 文件
var exec = require('child_process').exec;
var cmd = 'rm -rf ./output.json';
exec(cmd, function(error, stdout, stderr) {
  // 获取命令执行的输出
  if (error !== null) {
    console.log('exec error: ' + error);
  }
  // 第一步 预览本地文件
  console.log("[step 1] Preview the local file".blue);
  var W_file = require('./readDirSync/index.js');
  new W_file(receiver_url);
  console.log("done");
  // 第二步 通过接口上传文件到路径（服务器要先起这个服务）
  console.log("[step 2] Local will connect to server".blue);
  var F_output = require(ROOT_DIR + '/output.json');
  var F_push = require(ROOT_DIR + '/bin/local-push.js');
  F_push.Push();
  // var Connect = require('./server-connect.js');
});

