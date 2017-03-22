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
          var count = 0;
          var detail = {};
          
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
                }else{
                  text = attrTitle.replace(/[\r\n\t\/ ]/g, "");
                }
              }
              detail[kind[0]] = text;
            } else {
              detail[kind] = text;
            }
            count++;
          });

          _this.dataSet.add(detail);
        }
      });
      return true;
    } catch (e) {
      return false;
    }
  },
}

module.exports = analyzer;