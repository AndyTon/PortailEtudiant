function route(app) {
  app.get("/accueilEtudiant", (req, res) => {
    res.render("Etudiant/accueilEtudiant");
  });
}

exports.route = route;
