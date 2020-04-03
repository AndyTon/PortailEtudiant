function route(app) {
  app.get("/accueilProf", (req, res) => {
    res.render("Enseignant/accueilProf");
  });

  app.get("/voirEleves", (req, res) => {
    res.render("Enseignant/voirEleves");
  });

  app.get("/CreerExercice", (req, res) => {
    res.render("Enseignant/CreerExercice");
  });
}

exports.route = route;
