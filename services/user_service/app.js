var express    = require('express');

var app        = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 3000;

var router = express.Router();

router.route('/login')
.get(function(req,res){
    res.set('Access-Control-Allow-Origin', '*');
    res.json({thisIsMyKey: 'ThisIsMyBody'});
});

app.use('/user', router);

app.listen(port, () => {
    console.log("Port 2000 working!");
});
