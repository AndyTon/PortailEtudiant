function route(app) {
  app.get("/accueilEtudiant", (req, res) => {
    res.render("Etudiant/accueilEtudiant");
  });

  app.get("/exercice", (req,res) => {
    res.render("Etudiant/exercice");
  })
}

exports.route = route;
