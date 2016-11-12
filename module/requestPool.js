var request = require("request");
var iconv = require("iconv-lite");
var BufferHelper = require("bufferhelper");

var eventsHandler = require("./eventsHandler.js");

/**
 * 请求池
 * 
 * @param {any} cookie
 * @param {any} thread
 * @param {any} finishCallback
 */
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
    this.queueCount--;
    this.finishCount++;
    if (errStatus) {
      req.isError = true;
      var errorMsg = req.errorMsg;
      if (err) {
        errorMsg += "，服务器连接失败";
        if (req.retryCount < 5) {
          this.push(req.options.url, req.errorMsg, req.callback, req.retryCount + 1);
          errorMsg += "，第" + req.retryCount + "次重试";
        }
        // logger.error(errorMsg);
        eventsHandler.emit('error', 'task', errorMsg, err);
      } else {
        errorMsg = "session过期";
        // logger.error(errorMsg);
        eventsHandler.emit('error', 'task', errorMsg);
        this.abort();
        return;
      }
    } else {
      var parcent = (this.finishCount / this.requests.length * 100).toFixed(2);
      eventsHandler.emit("progress", 'task', "已完成----" + parcent + "%", parcent);
    }
    this.execute();
  },
  push: function (url, errorMsg, callback, retryCount) {
    var value = {
      isFinished: false,
      isStarted: false,
      isError: false,
      retryCount: retryCount || 0,
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
  // 终止所有请求
  abort: function () {
    // logger.info("终止爬取");
    eventsHandler.emit('finish', 'task', "终止爬取");
    this.requests.forEach(function (el) {
      if (el.isStarted && !el.isFinished && el.request) {
        el.request.abort();
      }
    });
  },
  // 重置
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
        eventsHandler.emit('finish', 'task', '爬取完成');
        this.finishCallback();
      }
    }
  }
}

module.exports = requestPool;