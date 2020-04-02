function route(app){
    app.get('/accueilProf', (req,res)=> {
        res.render('accueilProf');
    });
}

exports.route = route;