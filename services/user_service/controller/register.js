function validateRegister(con, lastName, firstName, password, email, role, callback){

    con.query("SELECT email FROM utilisateurs", 
    function(err,result){
        if(err) throw err;

        let hasSame = false;

        for(let step = 0; step < result.length; step++){
            if(result[step].email == email){
                hasSame = true;
                return callback(false, "Il y a déjà un compte enregistré avec cette adresse courriel.");
            }
        }

        if(!hasSame){

            //deal with role
            let roleTeacher = 0;

            if(role == "Enseignant"){
                roleTeacher = 1;
            }

            con.query("INSERT INTO utilisateurs(nom, prenom, email, pw, prof) VALUES(\"" + lastName + "\",\"" + firstName + "\",\"" + email + "\",\"" + password + "\"," + roleTeacher + ")",
                function(err,result){
                    if(err) throw err;

                    return callback(true);
                });
        }

    });

    
}



exports.validateRegister = validateRegister;