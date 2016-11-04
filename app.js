var GetLesson = require("./app/getLesson.js");
var DataSet = require("./module/dataSet.js");
var cmd = require("./cmd.js");

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


cmd({
  userid: "",
  password: ""
}).execute();
