var GetLesson = require("./app/getLesson.js");
var DataSet = require("./module/dataSet.js");
var cmd = require("./cmd.js");

// changeOption由教务网上获取。。需要最后加一句
// module.exports = {
// 	sub: sub,
// 	grade: grade
// };
var query = require("./app/changeOption.js");

// var getLesson = GetLesson(
// 	"JSESSIONID=414D2120E23841B4C9C04A6B24C041D9.tomcat2",
// 	"1bd32be5-dd71-3410-91d0-a3e9a7ea245"
// );

// var getPubRequiredLsn = getLesson.getPubRequiredLsn("output/pubrequiredlsn.json");
// getPubRequiredLsn.execute();

// var getPlanLsn = getLesson.getPlanLsn("output/planlsn.json", query);
// getPlanLsn.execute();

// var getPubLsn = getLesson.getPubLsn("output/publsn.json");
// getPubLsn.execute();

// DataSet.importJson("output/bba.json", function (dataSet) {
// 	dataSet.exportSql("output/ppp.sql");
// });


// var spider = new Spider("210.42.121.132");
// spider.getGenImg();

cmd({
  userid: "2014302580029",
  password: "19950816"
}).execute();