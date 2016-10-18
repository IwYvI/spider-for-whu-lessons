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
      content.each(function (index, el) {
        if (index !== 0) {
          var count = 0;
          var detail = {};
          $(this).children().each(function (index, el) {
            var text = $(this).text().replace(/[\r\n\t\/ ]/g, "");
            if (!text || text == " ") {
              text = "NULL";
            }
            var kind = _this.selector[count];
            if (typeof (kind) == "object") {
              if (kind[1] && kind[1] === true) {
                $(this).children().each(function (index, el) {
                  text = $(this).text().replace(/[\r\n\t\/ ]/g, "");
                  if (!text) {
                    text = "NULL";
                  }
                });
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