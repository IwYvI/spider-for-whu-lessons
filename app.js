var GetLesson = require("./app/getLesson.js");
var DataSet = require("./module/dataSet.js");
var query = require("./app/changeOption.js");

var getLesson = GetLesson(
	"JSESSIONID=4A905112C17B89C0F46FEAE28B01DADE.tomcat2",
	"edd04d3b-9e0c-3c48-bc79-884c566ceb21"
);

// var getPubRequiredLsn = getLesson.getPubRequiredLsn("output/test.json");
// getPubRequiredLsn.execute();

var getPlanLsn = getLesson.getPlanLsn("output/plan.json", query);
getPlanLsn.execute();

// DataSet.importJson("output/bba.json", function (dataSet) {
// 	dataSet.exportSql("output/ppp.sql");
// });