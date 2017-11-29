var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json());



//API Router
var router = express.Router();// calling the outside routes
var index = require('./routes').router;
app.use('/',index);



//start Server
app.use(express.static('public'));
var server = app.listen(3000,function(){

    console.log("Listening to port %s",server.address().port);
});