var connection = require("../db_connection").conn;


function createReport(report, callback){
    console.log("---------------report creation start");
    connection.query("show tables;",[{}],function(error, results, fields){
        if (error) throw callback(null, error);
        //callback(results, null);
        callback({reportId: 1}, null);
    });
};






module.exports.createReport = createReport;

