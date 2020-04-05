//The function receives these:
    // - Title of the exercise
    // - The 'enonce' of the exercise
    // - the questions of the exercise
    // - professor's last name
    // - professor's first name
    // - professor's email
    // - professor's role

// The function need to return a true if the exercise was saved correctly.

function saveExercice(con, ProfLastName, ProfFirstName, ProfEmail, ProfRole, titre, listID, enonce, questions, callback){
    
}

// The function will receive the professors account details.
    // - professor's last name
    // - professor's first name
    // - professor's email
    // - professor's role

// The function need to return:
    // - The Title of the exercise
    // - The student ID
    // - The student's last name
    // - The student's first name
    // - The student's email

// To return multiple arguments, use callback. Example, callback(id, lastname, firstname, email)

// Voir http://localhost:2000/CorrigerExercice pour exemple de l'information dont on a besoin.

function getAllStudentExercices(con, ProfLastName, ProfFirstName, ProfEmail, ProfRole, callback){

}

exports.saveExercice = saveExercice;
exports.getAllStudentExercices = getAllStudentExercices;