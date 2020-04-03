function getAllStudents(con, callback){
    let sql = "SELECT id, nom, prenom, email FROM utilisateurs WHERE prof = false";

    con.query(sql, (err,resultat) => {
        if (err) throw err;

        return callback(resultat);
    })
}

exports.getAllStudents = getAllStudents;