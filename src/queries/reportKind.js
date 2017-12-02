var connection = require("../db_connection").conn;

function getAll(callback) {

    console.log("starting method getReportKind -------------")

    connection.query('Select * from report_kind', function (error, results, fields) {

        if (error) throw callback(null, error);
        callback(results, null);

    });
};
module.exports.getAll = getAll;
