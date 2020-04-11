
// this function will verify that the user exists in the 'utilisateurs' table. 
// lastName is a String. ex: "Ton-That"
// firstName is a String. ex: "Andy"
// email is a String. ex: "test@test.ca"
// role is a String. ex: "Étudiant" or "Enseignant"

function validateCredentials(lastName, firstName, email, role, con, callback) {
    let sql = "select * from utilisateurs where email = '" + email + "'";

    con.query(sql, (err, resultat) => {
        if (err) throw err;

        //deal with role
        let roleTeacher = 0;

        if(role == "Enseignant"){
            roleTeacher = 1;
        }

        if (resultat[0].prenom == firstName && resultat[0].nom == lastName && resultat[0].prof == roleTeacher) {
            return callback(true);
        } else {
            return callback(false, resultat[0]);
        }
    });
}

exports.validateCredentials = validateCredentials;