function route(app){
    app.get('/', (req,res) => {
        res.render('register');
    });
    
    app.get('/register', (req,res) => {
        res.render('register');
    });
    
    app.get('/login', (req,res)=> {
        res.render('login');
    });
}

exports.route = route;