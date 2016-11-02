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
          spider.setCsrftoken = result || function () {
            // logger.warn("未获取到csrftoken");
            throw new Error("未获取到csrftoken");
          };
          console.log(spider.cookie);
          console.log(spider.csrftoken);
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
            throw new Error("登陆时连接服务器出错");
          }
          spider.requestResource(Spider.ADDRESS.main, function (status, result) {
            if (!status) {
              throw new Error("获取首页信息时连接服务器出错");
            }
            var $ = cheerio.load(result);
            if (result.indexOf("csrftoken") == -1) {
              var msg = $("#alertp").parent().text();
              console.log(msg);
              // logger.warn("某个地方出错，需要重新登陆");
              login(callback);
            } else {
              var tokenString = $("li#btn1").first().attr("onlick");
              console.log(tokenString);
              var tokenArray = tokenString.match(/(\\w+)(-\\w+)+/);
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

function input(hint, callback) {
  prompt.start();
  prompt.get([hint], function (err, result) {
    callback(result[hint]);
  });
}

module.exports = cmd;