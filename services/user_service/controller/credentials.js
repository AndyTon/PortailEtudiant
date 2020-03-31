
// this function will verify that the user exists in the 'utilisateurs' table. 
// lastName is a String. ex: "Ton-That"
// firstName is a String. ex: "Andy"
// email is a String. ex: "test@test.ca"
// role is a String. ex: "Étudiant" or "Enseignant"

function validateCredentials(lastName, firstName, email, role, con, callback){
    let sql = "select * from utilisateurs where adresse_email = '"+email+"'";

    con.query(sql, (err,resultat) => {
        if(err) throw err;
        
        if(resultat[0].prenom==firstName&&resultat[0].nom==lastName&&resultat[0].prof==role){
           return true;
        }else{
            return false
        }
    }
}

exports.validateCredentials = validateCredentials;