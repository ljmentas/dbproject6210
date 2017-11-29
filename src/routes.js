var express = require('express');
var router = express.Router();
var picture = require('./queries/picture');
var user = require('./queries/user');
var reportKind = require('./queries/reportKind');


//-------------------
var collectionName = "ArcherFaces";
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var AWS = require('aws-sdk');
var region = 'us-east-1';
AWS.config.region = region;
var rekognition = new AWS.Rekognition({region: region});
var uuid = require('node-uuid');
var fs = require('fs-extra');
var path = require('path');
//-------------------



var api = router.route('/api/v1/user/:id');

api.all(function(req,res,next){
    console.log(req.method,req.url);

    next();
});


api.get(function(req,res){
    console.log(req.method,req.url);// we should move this to middleware
    user.getUser({id: req.params.id}, function (result, error) {
        if (error) {
            console.log(error);
            res.status(500).send({errorMessage: "database error", code: 1000});
        }
        var response = result[0];
        res.send(response);
    });
});


api.get(function(req,res){
    console.log(req.method,req.url);// we should move this to middleware
    reportKind.getAll({}, function (result, error) {
        if (error) {
            console.log(error);
            res.status(500).send({errorMessage: "database error", code: 1000});
        }
        res.send(result);
    });
});

router.post('/api/recognize/:reportid', upload.single("image"), function (req, res, next) {
    var bitmap = fs.readFileSync(req.file.path);

    rekognition.searchFacesByImage({
        "CollectionId": collectionName,
        "FaceMatchThreshold": 70,
        "Image": {
            "Bytes": bitmap,
        },
        "MaxFaces": 1
    }, function(err, data) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            if(data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Face)
            {
                picture.createRecognizePicture({homelessId: data.FaceMatches[0].Face,
                    picture: bitmap, report: req.params.reportid},function(result, error){
                    if (error) {
                        console.log(error);
                        res.status(500).send({errorMessage: "database error", code: 1000});
                    } else {
                        res.send({responseMessage: "person recognized", code: 200});//our own error code
                    }


                });


            } else {
                picture.createPicture({homelessId: data.FaceMatches[0].Face,
                    picture: bitmap, report: req.params.reportid});
                res.send({responseMessage: "person not recognized", code: 404});//our own error code
            }
        }
    });
});


module.exports.router = router;