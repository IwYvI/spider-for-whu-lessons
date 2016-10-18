var request = require("request");
var iconv = require("iconv-lite");
var BufferHelper = require("bufferhelper");
var log4js = require('log4js');
log4js.configure("log4js.json");
var logger = log4js.getLogger();

function requestPool(cookie, thread, finishCallback) {
  this._init(cookie, thread, finishCallback);
}

requestPool.prototype = {
  _init: function (cookie, thread, finishCallback) {
    this.requests = [];
    this.count = 0;
    this.finishCount = 0;
    this.queueCount = 0;
    this.thread = thread || 10;
    this.cookie = cookie || function () {
      throw new Error("no cookie");
    };
    this.finishCallback = finishCallback;
  },
  _finish: function (req, errStatus, err) {
    req.isFinished = true;
    if (errStatus) {
      req.isError = true;
      var errorMsg = req.errorMsg;
      if (err) {
        errorMsg += "，服务器连接失败";
      } else {
        errorMsg = "session过期";
        logger.error(errorMsg);
        this.abort();
        return;
      }
      logger.error(errorMsg);
      // 添加错误日志部分
    }
    this.queueCount--;
    this.finishCount++;
    // console.log("已完成----" + (this.finishCount / this.requests.length * 100).toFixed(2) + "%");
    logger.trace("已完成----" + (this.finishCount / this.requests.length * 100).toFixed(2) + "%");
    this.execute();
  },
  push: function (url, errorMsg, callback) {
    var value = {
      isFinished: false,
      isStarted: false,
      isError: false,
      options: {
        method: "get",
        url: url,
        headers: {
          'Cookie': this.cookie,
          'Connection': 'keep-alive'
        }
      },
      errorMsg: errorMsg,
      callback: callback,
      request: null
    }
    this.requests.push(value);
    this.execute();
  },
  abort: function () {
    logger.info("终止爬取");
    this.requests.forEach(function (el) {
      if (el.isStarted && !el.isFinished && el.request) {
        el.request.abort();
      }
    });
  },
  reset: function () {
    this.abort();
    this.requests.length = 0;
    this.count = 0;
    this.queueCount = 0;
  },
  execute: function () {
    var _this = this;
    if (this.queueCount < this.thread) {
      if (this.requests[this.count]) {
        this.queueCount++;
        var newRequest = this.requests[this.count];
        this.count++;
        // while (newRequest.isStarted) {
        //   newRequest = this.requests[this.count++];
        // }
        newRequest.isStarted = true;

        var buffer = new BufferHelper();
        var r = request(newRequest.options)
          .on('error', function (err) {
            _this._finish(newRequest, true, err);
          })
          .on('data', function (data) {
            buffer.concat(data);
          })
          .on('end', function () {
            var result = iconv.decode(buffer.toBuffer(), 'gb2312');
            var errStatus = newRequest.callback(result);
            _this._finish(newRequest, !errStatus);
          });
        newRequest.request = r;

      } else if (this.queueCount <= 0 && this.requests.length > 0) {
        logger.info("爬取完成");
        this.finishCallback();
      }
    }
  }
}

module.exports = requestPool;