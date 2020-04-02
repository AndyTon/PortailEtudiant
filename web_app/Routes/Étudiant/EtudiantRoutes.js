function route(app) {
  app.get("/accueilEtudiant", (req, res) => {
    res.render("accueilEtudiant");
  });
}

exports.route = route;
