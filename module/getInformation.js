// 请求制造工厂
// 指定了基本请求url

var cheerio = require("cheerio");

function getInformation(baseUrl, requestPool, analyzer, description) {
  this._init(baseUrl, requestPool, analyzer, description);
}

getInformation.prototype = {
  _init: function (baseUrl, requestPool, analyzer, description) {
    this.baseUrl = baseUrl;
    this.requestPool = requestPool;
    this.analyzer = analyzer;
    this.description = description;
    this.pageCount = 1;
    this.isStarted = false;
    this.isFinished = false;
  },
  _setPageCount: function (data) {
    var result = true;
    try {
      var _this = this;
      var $ = cheerio.load(data);
      var title = $("title").text();
      if(title.indexOf("教务") != -1){
        return false;
      }
      var pageLink = $(".total_count a");
      var totalCount = 1;
      if (pageLink.length != 0) {
        totalCount = $(".total_count a").last().attr('href').match(/pageNum=(\d{1,2})/).pop();
      }
      this.pageCount = Number(totalCount);
      result = this.analyzer.load($);
    } catch (e) {
      return false;
    }
    for (var i = 2; i <= this.pageCount; i++) {
      this.requestPool.push(this.baseUrl + "&pageNum=" + i, "获取" + this.description + "第" + i + "页" + "失败", function (data) {
        return _this.analyzer.load(cheerio.load(data));
      });
    }
    return result;
  },
  execute: function () {
    var _this = this;
    this.requestPool.push(this.baseUrl, "获取" + this.description + "页码失败", function (data) {
      return _this._setPageCount(data);
    });
  }
}

module.exports = getInformation;