var loginService = require('./controller/login');
var registerService = require('./controller/register');
var certificateService = require('./controller/certificate');
var express    = require('express');

var app        = express();
var bodyParser = require('body-parser');

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

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    // Technically, the access should be managed, but for this project, all sources are accepted for the moment.
    res.header("Access-Control-Allow-Origin", "http://localhost:2000"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Max-Age', '86400');
    next();
  });

var port = 3000;

// Routes
var router = express.Router();
var incorrectHeaderMessage = "Please send correct Header keys.";

router.route('/login')
.get(function(req,res){
    // Request handling
    
    let user = req.header('user');
    let pw = req.header('pw');

    if(user == null || pw == null){
        res.status(400).send(incorrectHeaderMessage);
    } else {
        loginService.validateLogin(user,pw, con, function(result){
            // Response handling
            if(result){
                // certificate
                res.status(200).send({ThisIsMyKey: "test"});
            } else {
                res.status(403).send();
            }
        });
    }

    
});

router.route('/register')
.post(function(req,res){
    // Request handling
    let lastName = req.header('lastName');
    let firstName = req.header('firstName');
    let password = req.header('password');
    let email = req.header('email');
    let role = req.header('role');

    if(lastName == null || firstName == null || password == null ||
        email == null || role == null){
            res.status(400).send(incorrectHeaderMessage);
        } else {
            registerService.validateRegister(lastName, firstName, password, email, role, function(result){

            });
        }
});

router.route('/certificate')
.get(function(req,res){
    // Request handling
    var certificate = req.header('certificate');
    
    if(certificate == null){
        res.status(400).send(incorrectHeaderMessage);
    } else {
        certificateService.validateCertificate();
    }
})

app.use('/user', router);

app.listen(port, () => {
    console.log("Port "+ port +" working!");
});
