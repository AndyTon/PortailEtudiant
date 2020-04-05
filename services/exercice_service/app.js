var exerciceService = require('./controller/exercice');

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Database connection
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
    database: "portailetudiant"
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Technically, the access should be managed, but for this project, all sources are accepted for the moment.
  res.header("Access-Control-Allow-Origin", "http://localhost:2000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Max-Age", "86400");
  next();
});

var port = 4000;

app.listen(port, () => {
  console.log("Port " + port + " working!");
});

// Routes
var router = express.Router();
app.use("/exercice", router);

router.route("/saveExercise")
.post(function (req, res) {
    //Request handling
    console.log(req.body);
    console.log(req.body.listID);
    console.log(req.body.enonce);
    console.log(req.body.questions);

    let lastName = req.header('lastName');
    let firstName = req.header('firstName');
    let email = req.header('email');
    let role = req.header('role');

    exerciceService.saveExercice(con, lastName, firstName, email, role, req.body.titre, req.body.listID, req.body.enonce, req.body.questions, function(result){

    });

    res.end();
});

router.route("/getStudentExercices")
.get(function (req,res) {
    //Request handling
    var lastName = req.header('lastName');
    var firstName = req.header('firstName');
    var email = req.header('email');
    var role = req.header('role');

    exerciceService.getAllStudentExercices(con, lastName, firstName, email, role, function(result){

    });
});
