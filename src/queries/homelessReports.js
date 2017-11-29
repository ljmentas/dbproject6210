var connection = require("../db_connection").conn;

function createReport(report, callback) {

    console.log("starting method createReport -------------")
    console.log(report);

    connection.query('INSERT INTO homeless_report () values (?,)', report, function (error, results, fields) {

        if (error) throw callback(null, error);
        callback(results, null);

    });

};

function getReport(report, callback) {
    console.log("starting method createReport -------------")
    console.log(JSON.stringify(report));

    connection.query('Select * from homeless_report where id = ', report.id, function (error, results, fields) {
        if (error) throw callback(null, error);
        callback(results, null);

    });


}


module.exports.createReport = createReport;
module.exports.getReport = getReport;