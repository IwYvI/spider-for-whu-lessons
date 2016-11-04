var log4js = require('log4js');
log4js.configure("log4js.json");
var logger = log4js.getLogger();
var prompt = require('prompt');
var cheerio = require("cheerio");

var Spider = require("./app/spider.js");

var ip, userid, password, xdvfb, spider;

function cmd(option) {
  ip = option.ip || function () {
    logger.warn("没有配置ip，使用默认值132");
    return "210.42.121.132";
  }();
  userid = option.userid || function () {
    logger.warn("没有配置账号，进入游客模式");
    return "";
  }();
  password = option.password || "";
  xdvfb = "";
  spider = new Spider(ip);
  return {
    execute: function () {
      login(function (status, result) {
        if (status) {
          spider.setCsrftoken(result);
          // console.log(spider.cookie);
          // console.log(spider.csrftoken);
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
            logger.error("登陆时连接服务器出错");
            return;
          }
          spider.requestResource(Spider.ADDRESS.main, function (status, result) {
            if (!status) {
              logger.error("获取首页信息时连接服务器出错");
              return;
            }
            var $ = cheerio.load(result);
            if (result.indexOf("csrftoken") == -1) {
              var msg = $("#alertp").parent().text();
              console.log(msg);
              // logger.warn("某个地方出错，需要重新登陆");
              login(callback);
              return;
            } else {
              var tokenString = $("li#btn1").first().attr("onclick");
              var tokenArray = tokenString.match(/(\w+)(-\w+)+/);
              var token = "";
              if (tokenArray) {
                token = tokenArray[0];
              }
              logger.info("登陆成功");
              callback(true, token);
            }
          })
        })
      });
    }
  })
}

function main() {
  var filePath = "output/";
  input("请输入爬取类型（0：公选，1：公必，2：专业课）", function (result) {
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
      default:
        logger.warn("请输入正确的类型");
        main();
        return;
    }
    input("请输入保存路径及文件名，默认为" + filePath, function (result) {
      if(result){
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