var GetLesson = require("./app/getLesson.js");
var DataSet = require("./module/dataSet.js");
var cmd = require("./cmd.js");
var eventsHandler = require("./module/eventsHandler.js");

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



// eventsHandler.addEventHandle({
//   info: function (target, msg, data) {
//     console.info(target + ":" + msg);
//   },
//   error: function (target, msg, data) {
//     console.error(target + ":" + msg + (data ? ". Error:" + data.toString() : ""));
//   },
//   warn: function (target, msg, data) {
//     console.warn(target + ":" + msg);
//   },
//   progress: function (target, msg, data) {
//     console.trace(msg);
//   },
//   finish: function (target, msg, data) {
//     console.info(target + ":" + msg);
//   }
// }); 
// DataSet.importJson("output/publsn[2017-2-16 17-09].json", function (dataSet) {
// 	dataSet.exportSql("output/publsn[2017-2-16 17-09].sql");
// });


// cmd({
//   userid: "",
//   password: ""
// }).execute();
