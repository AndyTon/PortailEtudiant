var express = require("express");
var app = express();
var bodyParser = require("body-parser");

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

    res.end();
});
