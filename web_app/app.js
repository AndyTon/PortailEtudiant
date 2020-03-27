var express = require('express');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/ressources'));

var port = 2000;

app.locals.port = port;

app.get('/', (req,res) => {
    res.render('register');
});

app.get('/register', (req,res) => {
    res.render('register');
});

app.get('/login', (req,res)=> {
    res.render('login');
});

app.get('/accueilProf', (req,res)=> {
    res.render('accueilProf');
});

app.get('/accueilEtudiant', (req,res)=> {
    res.render('accueilEtudiant');
});

app.listen(port, () => {
    console.log("Port " + port + " working!");
});