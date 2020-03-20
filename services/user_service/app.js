var loginService = require('./controller/login');
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

router.route('/login')
.get(function(req,res){
    // Request handling
    
    let user = req.header('user');
    let pw = req.header('pw');

    if(user == null || pw == null){
        res.status(400).send("Please send correct Header keys.");
    } else {
        loginService.validateLogin(user,pw, con, function(result){
            // Response handling
            if(result){
                res.status(200).send({ThisIsMyKey: "test"});
            } else {
                res.status(403).send();
            }
        });
    }

    
});

app.use('/user', router);

app.listen(port, () => {
    console.log("Port "+ port +" working!");
});
