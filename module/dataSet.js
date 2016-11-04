var fs = require("fs");
var log4js = require('log4js');
log4js.configure("log4js.json");
var logger = log4js.getLogger();

/**
 * 数据集
 * 
 * @param {any} name
 * @param {any} template
 */
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
  // 添加数据
  add: function (json) {
    this.data.push(json);
  },
  // 获得数据数量
  getLength: function () {
    return this.data.length;
  },
  // 按照模板处理数据顺序，若type为1时转义'
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
  // 获取json字符串
  _getString: function () {
    var result = {};
    result[this.name] = this._filter(this.data);
    return JSON.stringify(result);
  },
  // 获取sql字符串
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
  // 保存到文件
  _saveFile: function (fileName, content) {
    fs.writeFile(fileName, content, function (err) {
      if (err) {
        logger.error(err.toString());
      }
      logger.info(fileName + "文件已保存");
    })
  },
  _getFileName: function(fileName, extension){
    var date = new Date();
    extension = "." + extension;
    var dateStr = "[" +[date.getFullYear(), date.getMonth()+1, date.getDate()].join("-") + " " + date.getHours() + "-" + ("0" + date.getMinutes()).slice(-2) + "]";
    if(fileName){  
      if(fileName.indexOf(extension)){
        fileName = fileName.replace(extension, dateStr + extension);
      }else{
        fileName += dateStr + extension;
      }
    }else{
      fileName = this.name + dateStr + extension;
    }
    return fileName;
  },
  exportJson: function (fileName) {
    this._saveFile(this._getFileName(fileName, "json"), this._getString());
  },
  exportSql: function (fileName, tableName) {
    this._saveFile(this._getFileName(fileName, "sql"), this._getSql(tableName ? tableName : this.name));
  },
}
// 导入json
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
      fileContent.forEach(function (el) {
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