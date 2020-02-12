const express = require('express');

const app = express();
app.set('view engine', 'ejs');

const port = 1000;

app.get('/', (req,res) => {
    res.render('register');
});

app.get('/login', (req,res)=> {
    res.render('login');
});

app.listen(port, () => {
    console.log("Port 1000 working!");
});