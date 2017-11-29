var mysql = require('mysql');

var con = mysql.createConnection({
   // host: 'mysql://localhost', //'localhost',
    user: 'root',
    password : '',
    port : 3306, //port mysql
    database:'',
    multipleStatements: true
});

con.connect(function(err){
    if (err) throw err;
});

module.exports.conn = con;

