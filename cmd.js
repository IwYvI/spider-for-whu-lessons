var log4js = require('log4js');
log4js.configure("log4js.json");
var logger = log4js.getLogger();
var prompt = require('prompt');

var Spider = require("./app/spider.js");
var eventsHandler = require("./module/eventsHandler.js");

var ip, userid, password, xdvfb, spider;

function cmd(option) {
  ip = option.ip || "";
  userid = option.userid || function () {
    logger.warn("没有配置账号，进入游客模式");
    return "";
  }();
  password = option.password || "";
  xdvfb = "";
  spider = new Spider(ip);
  eventsHandler.addEventHandle({
    info: function(target, msg, data){
      logger.info(target + ":" + msg);
    },
    error: function(target, msg, data){
      logger.error(target + ":" + msg + (data ? ". Error:" + data.toString() : ""));
    },
    warn: function(target, msg, data){
      logger.warn(target + ":" + msg);
    },
    progress: function(target, msg, data){
      logger.trace(msg);
    },
    finish: function(target, msg, data){
      logger.info(target + ":" + msg);
      if(target == "task"){
        main();
      }
    }
  })
  return {
    execute: function () {
      login(function (status) {
        if (status) {
          main();
        }
      });
    }
  }
}

function login(callback) {
  spider.requestImg(function (r) {
    if (r) {
      input("请输入验证码，图片存在目录下", function (result) {
        xdvfb = result;
        spider.login(userid, password, xdvfb, function (status) {
          if (!status) {
            login(callback);
          } else {
            callback(true);
          }
        })
      });
    }
  })
}

function main() {
  var filePath = "output/";
  input("请输入爬取类型（0：公选，1：公必，2：专业课，-1：退出）", function (result) {
    var type = result;
    switch (type) {
      case '0':
        filePath += "publsn.json";
        break;
      case '1':
        filePath += "pubrequiredlsn.json";
        break;
      case '2':
        filePath += "planlsn.json";
        break;
      case '-1':
        return;
      default:
        logger.warn("请输入正确的类型");
        main();
        return;
    }
    input("请输入保存路径及文件名，默认为" + filePath, function (result) {
      if (result) {
        filePath = result;
      }
      spider.start(type, filePath);
    });
  });
}


function input(hint, callback) {
  prompt.start();
  prompt.get([hint], function (err, result) {
    callback(result[hint]);
  });
}

module.exports = cmd;