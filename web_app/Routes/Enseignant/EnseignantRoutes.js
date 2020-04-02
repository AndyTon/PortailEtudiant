function route(app){
    app.get('/accueilProf', (req,res)=> {
        res.render('Enseignant/accueilProf');
    });

    app.get('/voirEleves', (req,res)=>{
        res.render('Enseignant/voirEleves');
    });
}

exports.route = route;