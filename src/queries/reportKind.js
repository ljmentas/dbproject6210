var connection = require("../db_connection").conn;

function getAll(parameters, callback) {

    console.log("starting method getReportKind -------------")
    console.log(parameters);

    connection.query('Select * from report_kind', parameters, function (error, results, fields) {

        if (error) throw callback(null, error);
        callback(results, null);

    });
};




module.exports.getAll = getAll;
