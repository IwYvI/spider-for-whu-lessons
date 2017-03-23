/**
 * 分析器
 * 
 * @param {any} selector
 * @param {any} dataSet
 */

function analyzer(selector, dataSet) {
  this._init(selector, dataSet);
}
analyzer.prototype = {
  _init: function (selector, dataSet) {
    this.selector = selector;
    this.dataSet = dataSet;
  },
  load: function ($) {
    try {
      var _this = this;
      var content = $('.listTable tr');
      content.each(function (index) {
        if (index !== 0) {
          var count = 0; // 子元素计数
          var detail = {}; // 数据详情
          var multiOptionStatus = false; // 当某节课有多个时间时的状态记录

          $(this).children().each(function () {
            var text = $(this).text().replace(/[\r\n\t\/ ]/g, "");
            if (!text || text == " ") {
              text = "NULL";
            }
            var kind = _this.selector[count];
            // 若selector为对象则取子元素的内容
            if (typeof (kind) == "object") {
              if (kind[1] && kind[1] === true) {
                var attrTitle = $(this).attr("title"); // 分析弹框中多条时间的部分
                if (!attrTitle) {
                  $(this).children().each(function () {
                    text = $(this).text().replace(/[\r\n\t\/ ]/g, "");
                    if (!text) {
                      text = "NULL";
                    }
                  });
                } else {
                  attrTitle = attrTitle.replace(/[\r\n\t ]/g, "");
                  var attrTitleContent = attrTitle.match(/<div>(.*)<\/div>/);
                  if (!attrTitleContent[1]) {
                    text = "NULL";
                  } else {
                    var attrTitleArray = attrTitleContent[1].split("<br/>");
                    if (!attrTitleArray[attrTitleArray.length - 1]) {
                      attrTitleArray.pop();
                    }
                    if (attrTitleArray.length > 1) {
                      multiOptionStatus = true;
                      text = attrTitleArray;
                    } else if (attrTitleArray.length > 0) {
                      text = attrTitleArray[0];
                    } else {
                      text = "NULL";
                    }

                  }
                }
              } else {
                throw new Error("selector格式错误");
              }
              detail[kind[0]] = text;
            } else {
              detail[kind] = text;
            }
            count++;
          });

          if (multiOptionStatus) {
            var detailArray = [{}];

            for (let key in detail) {
              if (typeof (detail[key]) == "object") {
                var tempDetailArray = [];
                for(let j = 0; j < detailArray.length; j++){
                  let detailValue = detailArray[j];
                  for (let i = 0; i < detail[key].length; i++) {
                    var tempDetail = Object.assign({}, detailValue);
                    if (!tempDetail[key]) {
                      tempDetail = Object.assign({}, detail); // 只有初始状态才赋值
                    }else{
                      detailValue[key] = detail[key][i];
                    }
                    tempDetail[key] = detail[key][i];
                    tempDetailArray.push(tempDetail);
                  }
                }
                detailArray = tempDetailArray;
              }
            }

            
            for(let i = 0; i < detailArray.length; i++){
              _this.dataSet.add(detailArray[i]);
            }
          }else{
            _this.dataSet.add(detail);
          }
        }
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
}

module.exports = analyzer;