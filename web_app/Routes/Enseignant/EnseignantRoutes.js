function route(app){
    app.get('/accueilProf', (req,res)=> {
        res.render('Enseignant/accueilProf');
    });
}

exports.route = route;