var loginService = require('./controller/login');
var registerService = require('./controller/register');
var certificateService = require('./controller/certificate');
var credentialsService = require('./controller/credentials');
var forgotpwService = require('./controller/forgotpw');
var resetService = require('./controller/reset');
var express    = require('express');

var app        = express();
var bodyParser = require('body-parser');

// Database connection
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
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

        try{
            loginService.validateLogin(user,pw, con, function(result, user){
                // Response handling
                if(result){
                    //handle role
                    let role = "Étudiant";
                    
                    if(user.prof[0] == 1){
                        role = "Enseignant";
                    }
                    
                    res.status(200).send({'lastName': user.nom,
                                            'firstName' : user.prenom,
                                            'password': user.pw,
                                            'email' : user.email,
                                            'role': role});
                } else {
                    res.status(403).send();
                }
            });
        } catch {
            res.status(403).send();
        }
        
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
                try{
                    registerService.validateRegister(con, lastName, firstName, password, email, role, function(result, message){
                        if(!result){
                            res.status(403).send({message: message});
                        } else {
                            res.status(200).send({'lastName': lastName,
                                                    'firstName' : firstName,
                                                    'password': password,
                                                    'email' : email,
                                                    'role': role});
                        }
                    
                    });
                } catch {
                    res.status(403).send();
                }
                
        }
});

// TO FINISH
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

router.route('/checkCredentials')
.get(function(req,res){
    let lastName = req.header('lastName');
    let firstName = req.header('firstName');
    let email = req.header('email');
    let role = req.header('role');

    credentialsService.validateCredentials(lastName, firstName, email, role, con, function(result){
        if(result){
            res.status(200).send();
        } else {
            res.status(403).send();
        }
    });
});

router.route('/Forgotpw')
.get(function(req,res){
    // Request handling
    
    let user = req.header('user');
    let secretQ = req.header('secretQ');

    if(user == null || secretQ == null){
        res.status(400).send(incorrectHeaderMessage);
    } else {

        try{
            forgotpwService.validateAdressWSQ(user,secretQ, con, function(result, user){
                // Response handling
                if(result){
                    //handle role
                    let role = "Étudiant";
                    
                    if(user.prof[0] == 1){
                        role = "Enseignant";
                    }
                    
                    res.status(200).send({'lastName': user.nom,
                                            'firstName' : user.prenom,
                                            'password': user.pw,
                                            'email' : user.email,
                                            'secretQ' : user.secretQ,
                                            'role': role});
                } else {
                    res.status(403).send();
                }
            });
        } catch {
            res.status(403).send();
        }
        
    }

});

router.route('/reset')
.patch(function(req,res){
    // Request handling
    let user = req.header('user');
    let newPw = req.header('newPw');
    let confirmPw = req.header('confirmPw');
    

    if(user == null || newPw == null || confirmPw == null
       ){
            res.status(400).send(incorrectHeaderMessage);
        } else {
                try{
                    resetService.validateresetPw(user,newPw,confirmPw, con, function(result, message){
                        if(!result){
                            res.status(403).send({message: message});
                        } else {
                            res.status(200).send({'lastName': lastName,
                                                    'firstName' : firstName,
                                                    'password': password,
                                                    'email' : email,
                                                    'secretQ' : secretQ,
                                                    'role': role});
                        }
                    
                    });
                } catch {
                    res.status(403).send();
                }
                
        }
});

app.use('/user', router);

app.listen(port, () => {
    console.log("Port "+ port +" working!");
});
