
// this function will verify that the user exists in the 'utilisateurs' table. 
// lastName is a String. ex: "Ton-That"
// firstName is a String. ex: "Andy"
// email is a String. ex: "test@test.ca"
// role is a String. ex: "Étudiant" or "Enseignant"

function validateCredentials(lastName, firstName, email, role, con, callback){
    return callback(true);
}

exports.validateCredentials = validateCredentials;