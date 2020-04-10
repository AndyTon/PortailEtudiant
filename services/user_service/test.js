var testService = require('./test/testService.js');

// Connection to database necessary for all tests.
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "portailetudiant",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

testService.runAllTests(con);


