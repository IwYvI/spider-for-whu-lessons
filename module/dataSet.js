var fs = require("fs");
var log4js = require('log4js');
var logger = log4js.getLogger();

function dataSet(name, template) {
  this._init(name, template);
}

dataSet.prototype = {
  _init: function (name, template) {
    this.data = [];
    this.name = name || 'default';
    this.template = template || function () {
      throw new Error("no template");
    }
  },
  add: function (json) {
    this.data.push(json);
  },
  getLength: function () {
    return this.data.length;
  },
  _filter: function (data, type) {
    var result = [];
    var _this = this;
    this.data.forEach(function (el, index) {
      var value = {};
      for (var key in _this.template) {
        if (type == 1) {
          value[key] = el[key] ? el[key].replace(/\'/g, "\\'") : null;
        } else {
          value[key] = el[key] || null;
        }
      }
      result.push(value);
    });
    return result;
  },
  _getString: function () {
    var result = {};
    result[this.name] = this._filter(this.data);
    return JSON.stringify(result);
  },
  _getSql: function (tableName) {
    var value = this._filter(this.data, 1);
    var result = [];
    value.forEach(function (el, index) {
      var sqlValue = [];
      for(var key in el){
        sqlValue.push(el[key]);
      }
      result.push("('" + sqlValue.join("','") + "')");
    });
    return "INSERT INTO '" + tableName + "' VALUES " + result.join(",") + ";";
  },
  _saveFile: function (fileName, content) {
    fs.writeFile(fileName, content, function (err) {
      if (err) {
        logger.error(err.toString());
      }
      logger.info(fileName + "文件已保存");
    })
  },
  exportJson: function (fileName) {
    var name = fileName ? fileName : (this.name + ".json");
    this._saveFile(name, this._getString());
  },
  exportSql: function (fileName, tableName) {
    var name = fileName ? fileName : (this.name + ".sql");
    this._saveFile(name, this._getSql(tableName ? tableName : this.name));
  },
}
dataSet.importJson = function (fileName, callback) {
  fs.readFile(fileName, 'utf-8', function (err, data) {
    if (err) {
      // console.log("can not read " + fileName);
      logger.error("无法读取" + fileName);
    } else {
      var fileData = JSON.parse(data);
      var fileContent;
      var newDataSet = null;
      var newName = "default_name";
      var newTemplate = {};
      for (var key in fileData) {
        newName = key;
        fileContent = fileData[key];
      }
      if (fileContent.length == 0) {
        logger.warn("无数据");
      } else {
        for (key in fileContent[0]) {
          newTemplate[key] = "";
        }
      }
      newDataSet = new dataSet(newName, newTemplate);
      fileContent.forEach(function (el, index) {
        newDataSet.add(el);
      });
      logger.info("文件读取成功");
      if (callback) {
        callback(newDataSet);
      }
    }
  });
}

module.exports = dataSet;