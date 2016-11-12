var GetLesson = require("./app/getLesson.js");
var DataSet = require("./module/dataSet.js");
var cmd = require("./cmd.js");

// var getLesson = GetLesson(
// 	"JSESSIONID=4BF5A28E566DAE118DAC353CB2B8E38A.tomcat2",
// 	"440c8bf9-7bba-3035-8b86-e756f0488b18",
//   "210.42.121.132"
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
