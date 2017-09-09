const Crawler = require("crawler");

const eventsHandler = require("./eventsHandler.js");

function r(cookie, thread, finishCallback) {
  this._init(cookie, thread, finishCallback);
}

r.prototype = {
  _init: function (cookie, thread, finishCallback) {
    this.count = 0;
    this.finishCount = 0;
    this.thread = thread || 10;
    this.cookie = cookie || function () {
      throw new Error("no cookie");
    };

    this.crawler = new Crawler({
      maxConnections: this.thread,
      rateLimit: 50,
      headers: {
        cookie: this.cookie
      }
    })

    this.crawler.on('drain', function () {
      eventsHandler.emit('finish', 'task', '爬取完成');
      this.finishCount = this.count = 0;
      finishCallback();
    });
  },
  push: function (url, errorMsg, callback, retryCount) {
    if (this.finishCount > this.count) {
      return;
    }
    const _this = this;
    this.count++;
    this.crawler.queue([{
      uri: url,
      incomingEncoding: 'gb2312',
      callback: function (error, res, done) {
        if (error) {
          eventsHandler.emit('error', error);
          _this.finishCallback = 9999999999;
        } else {
          const errStatus = callback(res.body);
          if (!errStatus) {
            eventsHandler.emit('error', 'task', "session过期");
            _this.finishCallback = 9999999999;
          } else {
            _this.finishCount++;
            let percent = (_this.finishCount / _this.count * 100).toFixed(2);
            eventsHandler.emit("progress", 'task', "已完成----" + percent + "%", percent);
          }
        }
        done();
      }
    }])
  }
}


module.exports = r;