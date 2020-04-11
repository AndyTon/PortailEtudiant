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
    let email = req.header('email');

    exerciceService.saveExercice(con, email, req.body.enonce, req.body.questions, function(result){
        if(result){
            res.status(200).send(result);
        } else {
            res.status(403).send();
        }
    });
});

router.route("/getExercicesForTeacher")
.get(function (req,res) {
    //Request handling
    var email = req.header('email');

    exerciceService.getExercicesForTeacher(con, email, function(result, exercises){
        if(result){
            res.status(200).send(exercises);
        } else {
            res.status(403).send();
        }
    });
});

router.route("/getExercicesForStudents")
.get(function (req,res) {
    //Request handling
    var email = req.header('email');

    exerciceService.getExercicesForStudents(con, email, function(result, exercices){
        if(result){
            res.status(200).send(exercices);
        } else {
            res.status(403).send();
        }
    });
});

router.route("/getExerciceForStudent")
.get(function(req,res){
    // Request handling
    var id = req.header('id');

    exerciceService.getExerciceForStudent(con, id, function(result, exercise){
        if(result){
            res.status(200).send(exercise)
        } else{
            res.status(403).send();
        }
    })
});

router.route("/saveSolutionForStudent")
.post(function(req,res){
    let idExercice = req.header('idExercice');
    let idProf = req.header('idProf');
    let idEleve = req.header('idEleve');
    let emailEleve = req.header('email');
    let solution = req.header('solution');

    exerciceService.saveSolutionForStudent(con, idExercice, idProf, idEleve, emailEleve, solution, function(result){
        if(result){
            res.status(200).send();
        } else {
            res.status(403).send();
        }
    });
});

router.route('/getSolutionStudent')
.get(function(req,res){
    let id_exercice = req.header('id_exercice');
    let id_etudiant = req.header('id_etudiant');
    let id_prof = req.header('id_prof');

    exerciceService.getSolutionStudent(con, id_exercice, id_etudiant, id_prof, function(result, solution){
        if(result){
            res.status(200).send(solution);
        } else {
            res.status(403).send();
        }
    })
});

router.route('/saveProfessorCorrection')
.post(function(req,res){
    let note = req.header('note');
    let idprof = req.header('idprof');
    let ideleve = req.header('ideleve');
    let idExercice = req.header('idExercice');

    exerciceService.saveProfessorCorrection(con, idprof, ideleve, idExercice, note, function(result){
        if(result){
            res.status(200).send();
        } else {
            res.status(403).send();
        }
    })
})
