var express = require('express');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/ressources'));

var port = 2000;

app.get('/', (req,res) => {
    res.render('register');
});

app.get('/register', (req,res) => {
    res.render('register');
});

app.get('/login', (req,res)=> {
    res.render('login');
});

app.get('/accueil', (req,res)=> {
    res.render('accueil');
});

app.listen(port, () => {
    console.log("Port 2000 working!");
});