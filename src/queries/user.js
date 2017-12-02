var connection = require("../db_connection").conn;

function createUser(user, callback) {

    console.log("starting method createUser -------------")
    console.log(user);


    connection.query('INSERT INTO reporter SET ?', user, function (error, results, fields) {

        if (error) throw callback(null, error);
        callback(results, null);

    });

};

function getUser(user, callback) {

    console.log("starting method createUser -------------")
    console.log(user);


    connection.query('select * from reporter where username = ?;', [user.username], function (error, results, fields) {

        if (error) callback(null, error);
        callback(results, null);

    });

};

module.exports.createUser = createUser;
module.exports.getUser = getUser;
