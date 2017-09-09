var request = require("request");
var iconv = require("iconv-lite");
var BufferHelper = require("bufferhelper");
var cheerio = require("cheerio");
var MD5 = require("crypto-js/md5");

// var log4js = require('log4js');
// log4js.configure("log4js.json");
// var logger = log4js.getLogger();

var GetLesson = require("./getLesson.js");
var eventsHandler = require("../module/eventsHandler.js");

function spider(ip) {
  this._init(ip);
}

spider.prototype = {
  _init: function (ip) {
    this.ip = ip || function () {
      eventsHandler.emit("warn", "spider", "没有配置ip，使用默认值132");
      return "210.42.121.132";
    }();;
    this.cookie = "";
    this.csrftoken = "";
    this.getLesson = null;
    this.thread = 10;
  },
  _getCsrftoken: function (data) {
    var $ = cheerio.load(data);

    var appendToken = data.match(/appendToken\('((\w+)(-\w+)+)'\)/);
    var csrftoken = "";

    if (data.indexOf("csrftoken") != -1) {
      var tokenString = $("li#btn1").first().attr("onclick");
      var tokenArray = tokenString.match(/(\w+)(-\w+)+/);
      if (tokenArray) {
        csrftoken = tokenArray[0];
      }
      this.setCsrftoken(csrftoken);
      eventsHandler.emit("info", "spider", "登陆成功");
      return true;
    } else if (appendToken) {
      csrftoken = appendToken[1];
      eventsHandler.emit("warn", "spider", "游客模式出错中");
      return false;
    } else {
      var msgArray = data.match(/>(\W+)<label id="alertp">/);
      var msgString = "";
      if (msgArray && msgArray[1]) {
        msgString = msgArray[1];
      } else {
        msgString = "登陆错误，需要重新登陆";
      }
      eventsHandler.emit("error", "spider", msgString);
      return false;
    }
  },
  setIp: function (ip) {
    this.ip = ip;
  },
  setCookie: function (cookie) {
    this.cookie = cookie;
  },
  setCsrftoken: function (csrftoken) {
    this.csrftoken = csrftoken;
  },
  setThread: function (thread) {
    this.thread = thread;
  },
  login: function (userid, password, xdvfb, callback) {
    var _this = this;
    var option = {
      method: "post",
      url: "http://" + this.ip + spider.ADDRESS.login,
      headers: {
        "Cookie": this.cookie,
        "Connection": "close"
      },
      form: {
        "id": userid,
        "pwd": password ? MD5(password).toString() : "",
        "xdvfb": xdvfb
      },
      followAllRedirects: true,
      timeout: 1000
    };

    var buffer = new BufferHelper();
    request(option)
      .on('error', function (err) {
        eventsHandler.emit("error", "spider", "服务器连接失败", err);
        callback(false);
      })
      .on('data', function (data) {
        buffer.concat(data);
      })
      .on('end', function () {
        var result = iconv.decode(buffer.toBuffer(), 'gb2312');
        callback(_this._getCsrftoken(result));
      });
  },
  start: function (type, filePath) {
    var _this = this;
    if (!this.getLesson) {
      this.getLesson = GetLesson(this.cookie, this.csrftoken, this.ip, this.thread);
    }
    if (!filePath) {
      eventsHandler.emit('warn', 'spider', '请输入正确的保存路径');
      return;
    }
    type += "";
    switch (type) {
      case '0':
        var getPubLsn = this.getLesson.getPubLsn(filePath);
        getPubLsn.execute();
        break;
      case '1':
        var getPubRequiredLsn = this.getLesson.getPubRequiredLsn(filePath);
        getPubRequiredLsn.execute();
        break;
      case '2':
        this.requestResource(spider.ADDRESS.query, function (status, result) {

          if (!status) {
            eventsHandler.emit('error', 'spider', '获取专业课分类数据出错');
            return;
          }
          eventsHandler.emit('info', 'spider', '获取专业课分类数据完成');
          var query = getQuery(result);

          var getPlanLsn = _this.getLesson.getPlanLsn(filePath, query);
          getPlanLsn.execute();
        });
        break;
      default:
        eventsHandler.emit('info', 'spider', '请选择正确的爬取类型');
    }
  },
  requestImg: function (callback) {
    var _this = this;
    var url = "http://" + this.ip + spider.ADDRESS.img;

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
        _this.setCookie(response.headers['set-cookie'][0].split(';')[0]);
      })
      .on("data", function (data) {
        bufferHelper.concat(data);
      })
      .on("end", function () {
        var result = bufferHelper.toBuffer();
        callback(true, result);
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

/**
 * 从changeOption.js文件中获取选择query
 * [sub, grade, description]
 * @param {any} jsdata
 */
function getQuery(jsdata) {
  var query = [];

  var subPattern = /var sub[\S\s]+'End'\)\);/g;
  var gradePattern = /var grade[\S\s]+'End'\)\);/g;
  var innerPattern = /('.+')/;

  var subString = jsdata.match(subPattern)[0];
  var gradeString = jsdata.match(gradePattern)[0];

  var subRawArray = subString.match(/aClass\((.*)\)/g);
  var gradeRawArray = gradeString.match(/aClass\((.*)\)/g);

  // console.log(gradeRawArray);


  subRawArray.forEach(function (el) {
    var subData = el.match(innerPattern)[0].replace(/'/g, "").split(",");
    if (subData && subData[2] != "End") {
      gradeRawArray.forEach(function (el) {
        var gradeData = el.match(innerPattern)[0].replace(/'/g, "").split(",");
        if (gradeData && gradeData[2] != "End") {
          query.push([subData[2], gradeData[2], subData[1] + gradeData[1]]);
        }
      });
    }
  });
  return query;
}

spider.ADDRESS = {
  img: "/servlet/GenImg",
  login: "/servlet/Login",
  query: "/js/changeOption.js"
};


module.exports = spider;