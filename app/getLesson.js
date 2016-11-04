var curry = require("curry");
var log4js = require('log4js');
log4js.configure("log4js.json");
var logger = log4js.getLogger();

var DataSet = require('../module/dataSet.js');
var RequestPool = require('../module/requestPool.js');
var GetInformation = require('../module/getInformation.js');
var Analyzer = require('../module/analyzer.js');


function getLesson(option) {
  this._init(option);
}

getLesson.prototype = {
  _init: function (option) {
    var _this = this;
    this.dataSet = new DataSet(option.name, option.template);
    this.requestPool = new RequestPool(option.cookie, option.thread, function () {
      option.finishCallback(_this.dataSet);
    });
    this.analyzer = new Analyzer(option.selector, this.dataSet);
    this.description = option.description;
    this.info = [];

    //不同query条件下
    if (!option.query && typeof (option.defaultQuery) == "string") {
      var url = option.baseUrl + "?" +
        (option.csrftoken ? "csrftoken=" + option.csrftoken + "&" : "") +
        option.defaultQuery;

      this.info.push(new GetInformation(url, this.requestPool, this.analyzer, option.description));
    } else {
      var query = option.query;
      for (var i = 0; i < query.length; i++) {
        var tempQuery = query[i];
        var computedQuery = option.defaultQuery.map(function (value, index) {
          return value + "=" + tempQuery[index];
        });
        computedQuery = computedQuery.join("&");
        var url = option.baseUrl + "?" +
          (option.csrftoken ? "csrftoken=" + option.csrftoken + "&" : "") +
          computedQuery;
        var description = option.description + tempQuery[2];
        this.info.push(new GetInformation(url, this.requestPool, this.analyzer, description));
      }
    }
  },
  execute: function () {
    logger.info("开始爬取：" + this.description);
    for (var i = 0; i < this.info.length; i++) {
      this.info[i].execute();
    }
  }
}

/**
 * 公选课部分
 */
var getPubLsn = function (cookie, csrftoken, ip, fileName) {
  return new getLesson({
    name: "lsn_pub_optional",
    template: {
      className: String,
      point: String,
      teacher: String,
      teacherStatus: String,
      department: String,
      book: String,
      year: String,
      term: String,
      timeAndPosition: String,
      kind: String,
    },
    cookie: cookie,
    thread: 10,
    selector: [
      "className",
      "point",
      "",
      "teacher",
      "teacherStatus",
      "department",
      "book",
      "year",
      "term", ["timeAndPosition", true],
      ["kind", true]
    ],
    baseUrl: "http://" + ip + "/stu/choose_PubLsn_list.jsp",
    defaultQuery: "XiaoQu=0&credit=0&keyword=",
    csrftoken: "",
    description: "公选课",
    finishCallback: function (fileName) {
      return function (dataSet) {
        if (!fileName) {
          fileName = "lsn_pub_optional.json";
        }
        dataSet.exportJson(fileName);
      }
    }(fileName)
  });
}

/**
 * 公共必修部分
 */
var getPubRequiredLsn = function (cookie, csrftoken, ip, fileName) {
  return new getLesson({
    name: "lsn_pub_required",
    template: {
      className: String,
      point: String,
      teacher: String,
      teacherStatus: String,
      department: String,
      book: String,
      year: String,
      term: String,
      timeAndPosition: String,
      remark: String,
      class: String,
    },
    cookie: cookie,
    thread: 10,
    selector: [
      "",
      "className",
      "point",
      "",
      "teacher",
      "teacherStatus",
      "department",
      "class",
      "book",
      "year",
      "term", ["timeAndPosition", true],
      ["remark", true]
    ],
    baseUrl: "http://" + ip + "/servlet/Svlt_QueryPubRequiredLsn",
    defaultQuery: "XiaoQu=0&credit=0&keyword=",
    csrftoken: csrftoken,
    description: "公共必修课",
    finishCallback: function (fileName) {
      return function (dataSet) {
        if (!fileName) {
          fileName = "lsn_pub_required.json";
        }
        dataSet.exportJson(fileName);
      }
    }(fileName)
  });
}

/**
 * 专业课部分
 */
var getPlanLsn = function (cookie, csrftoken, ip, fileName, query) {
  return new getLesson({
    name: "lsn_plan",
    template: {
      className: String,
      point: String,
      teacher: String,
      teacherStatus: String,
      department: String,
      book: String,
      year: String,
      term: String,
      timeAndPosition: String,
      status: String,
      class: String,
      grade: String,
    },
    cookie: cookie,
    thread: 10,
    selector: [
      "className",
      "status",
      "point",
      "teacher",
      "teacherStatus",
      "department",
      "class",
      "grade",
      "book",
      "",
      "year",
      "term", ["timeAndPosition", true]
    ],
    baseUrl: "http://" + ip + "/servlet/Svlt_QueryPlanLsn",
    defaultQuery: ["subject", "grade"],
    query: query,
    csrftoken: csrftoken,
    description: "专业课",
    finishCallback: function (fileName) {
      return function (dataSet) {
        if (!fileName) {
          fileName = "lsn_pub_optional.json";
        }
        dataSet.exportJson(fileName);
      }
    }(fileName)
  });
}

module.exports = function (cookie, csrftoken, ip) {
  return {
    getPubLsn: curry(getPubLsn)(cookie, csrftoken, ip),
    getPubRequiredLsn: curry(getPubRequiredLsn)(cookie, csrftoken, ip),
    getPlanLsn: curry(getPlanLsn)(cookie, csrftoken, ip),
  }
}