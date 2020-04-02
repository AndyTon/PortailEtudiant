var generalRoutes = require('./Routes/General/GeneralRoutes');
var enseignantRoutes = require('./Routes/Enseignant/EnseignantRoutes');
var etudiantRoutes = require('./Routes/Étudiant/EtudiantRoutes');

var express = require('express');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/ressources'));

var port = 2000;

app.locals.port = port;

//General Routes
generalRoutes.route(app);

//Routes for Enseignant
enseignantRoutes.route(app);

//Routes for Étudiant
etudiantRoutes.route(app);

app.listen(port, () => {
    console.log("Port " + port + " working!");
});