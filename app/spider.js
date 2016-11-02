var request = require("request");
var iconv = require("iconv-lite");
var BufferHelper = require("bufferhelper");
var fs = require("fs");
var MD5 = require("crypto-js/md5");

var log4js = require('log4js');
log4js.configure("log4js.json");
var logger = log4js.getLogger();

var GetLesson = require("./getLesson.js");
var query = require("./changeOption.js");

function spider(ip) {
  this._init(ip);
}

spider.prototype = {
  _init: function (ip) {
    this.ip = ip || "";
    this.cookie = "";
    this.csrftoken = "";
    this.getLesson = null;
  },
  setIp: function (ip) {
    this.ip = ip;
  },
  setCsrftoken: function (csrftoken) {
    this.csrftoken = csrftoken;
  },
  login: function (userid, password, xdvfb, callback) {
    var option = {
      method: "post",
      url: "http://" + this.ip + spider.ADDRESS.login,
      headers: {
        "Cookie": this.cookie,
        "Connection": "keep-alive"
      },
      form: {
        "id": userid,
        "pwd": password ? MD5(password).toString() : "",
        "xdvfb": xdvfb
      },
      followAllRedirects: true,
      timeout: 1000
    };
    // var buffer = new BufferHelper();
    request(option)
      .on('error', function (err) {
        console.log(err);
        callback(false);
      })
      // .on('data', function (data) {
      //   buffer.concat(data);
      // })
      .on('end', function () {
        callback(true);
      });
  },
  start: function (type, filePath) {
    if (!this.getLesson) {
      this.getLesson = GetLesson(this.token, this.csrftoken);
    }
    if (!filePath) {
      logger.info("请输入正确的保存路径");
      return;
    }
    switch (type) {
      case 0:
        var getPubRequiredLsn = this.getLesson.getPubRequiredLsn(filePath);
        getPubRequiredLsn.execute();
        break;
      case 1:
        var getPlanLsn = this.getLesson.getPlanLsn(filePath, query);
        getPlanLsn.execute();
        break;
      case 2:
        var getPubLsn = this.getLesson.getPubLsn(filePath);
        getPubLsn.execute();
        break;
      default:
        logger.info("请输入正确的爬取类型");
    }
  },
  requestImg: function (callback) {
    var _this = this;
    var url = "http://" + this.ip + spider.ADDRESS.img;
    var imgName = "img.jpg";

    var bufferHelper = new BufferHelper();
    request({
        url: url,
        headers: {
          'Connection': 'keep-alive'
        }
      })
      .on("error", function (err) {
        console.log(err);
        callback(false);
      })
      .on("response", function (response) {
        _this.cookie = response.headers['set-cookie'][0].split(';')[0];
      })
      .on("data", function (data) {
        bufferHelper.concat(data);
      })
      .on("end", function () {
        fs.writeFile(imgName, bufferHelper.toBuffer(), function (err) {
          if (err) throw err;
          console.log("img Saved !"); //文件被保存
          callback(true);
        });
      });
  },
  requestResource: function (addr, callback) {
    var _this = this;
    var url = "http://" + this.ip + addr;
    var option = {
      method: "get",
      url: url,
      headers: {
        'Cookie': this.cookie,
        'Connection': 'keep-alive'
      },
      followAllRedirects: true,
      timeout: 1000
    };

    var buffer = new BufferHelper();
    request(option)
      .on('error', function (err) {
        console.log(err);
        callback(false);
      })
      .on('data', function (data) {
        buffer.concat(data);
      })
      .on('end', function () {
        var result = iconv.decode(buffer.toBuffer(), 'gb2312');
        callback(true, result);
      });
  }
}

spider.ADDRESS = {
  img: "/servlet/GenImg",
  login: "/servlet/Login",
  main: "/stu/stu_index.jsp"
};


module.exports = spider;