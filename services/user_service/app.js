var loginService = require('./controller/login');
var express    = require('express');

var app        = express();
var bodyParser = require('body-parser');

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

var router = express.Router();

router.route('/login')
.get(function(req,res){
    // Request handling
    console.log(req.headers);
    
    let user = req.header('user');
    let pw = req.header('pw');
    
    loginService.validateLogin(user,pw);
    
    // Response handling
    res.json({thisIsMyKey: 'ThisIsMyBody'});
});

app.use('/user', router);

app.listen(port, () => {
    console.log("Port "+ port +" working!");
});
