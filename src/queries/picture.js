var connection = require("../db_connection").conn;

function createPicture(picture, callback) {

    console.log("starting method createPicture -------------")
    console.log(picture);

    connection.query('show tables;', {}, function (error, results, fields) {
//add the picture to the reportId only
        if (error) throw callback(null, error);
        callback(results, null);

    });

};

function createRecognizePicture(recognizedPicture, callback) {

    console.log("starting method createRecognizePicture -------------");

    connection.query('show tables;', {}, function (error, results, fields) {
//we should insert the picture in the report, we should insert the picture in the homeless picture
        if (error) throw callback(null, error);
        callback(results, null);

    });

};





module.exports.createPicture = createPicture;
module.exports.createRecognizePicture = createRecognizePicture;