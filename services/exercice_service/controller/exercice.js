//The function receives these:
    // - Title of the exercise
        // String Format
    // - The 'enonce' of the exercise
        // String Format
    // - the questions of the exercise
        // Array Format
        // Here is the format of each element. There are currently three types of questions, so three formats.
            // - TEXTAREA -> Type question à réponse courte 'question : TEXTAREA : 2 : solution'
            // - TEXTAREA -> Type question à développement 'question : TEXTAREA : 10 : solution'
            // - DIV -> Type question à choix multiples 'question : DIV : solution'
                            // the solution is inside the options.
                            // Each option is separated by a '>'
                            // the 'checked' option has a '!checked' behind it
                            // example: 'question1:DIV:option1!checked>option>option2' there are three options. option1 is checked and is the solution.
                        
        // Example: ['question1:DIV:option1!checked>option>option2', 'question2:TEXTAREA:10:solution']
    // - professor's last name
    // - professor's first name
    // - professor's email
    // - professor's role

// The function need to return a true if the exercise was saved correctly.

function saveExercice(con, ProfLastName, ProfFirstName, ProfEmail, ProfRole, titre, enonce, questions, callback){
    
}

// The function will receive the professors account details.
    // - professor's last name
    // - professor's first name
    // - professor's email
    // - professor's role

// The function needs to return:
    // - The Title of the exercise
    // - The student ID
    // - The student's last name
    // - The student's first name
    // - The student's email

// To return multiple arguments, use callback. Example, callback(id, lastname, firstname, email)

// Voir http://localhost:2000/CorrigerExercice pour exemple de l'information dont on a besoin.

function getExercicesForTeacher(con, ProfLastName, ProfFirstName, ProfEmail, ProfRole, callback){

}

// The function will receive the professors account details.
    // - student's last name
    // - student's first name
    // - student's email
    // - student's role

// The function needs to return:
    // - The Title of the exercise
    // - The professor's last name
    // - The professor's first name
    // - The professor's email

// Voir http://localhost:2000/accueilEtudiant pour exemple de l'information dont on a besoin.
function getExercicesForStudents(con, StudentLastName, StudentFirstName, StudentEmail, StudentRole, callback){

}

// This function is for the student to do his exercise, once he has chosen an exercise from his list of exercises to do.
// The function should receive
    // - exercice Id

// The function should return:
    // - Exercice Id
    // - id prof
    // - enonce exercice
    // - question exercice

function getExerciceForStudent(con, exerciceId, callback){

}

// This function is for the student to complete his exercise and submit his solution.
// The function should receive
    // - exercice Id
    // - id prof
    // - solution eleve

// The function should return:
    // boolean if save was successful

function saveSolutionForStudent(con, exerciceId, idprof, solutionEleve, callback){

}

// This function is for when the professor looks at the student's solution and corrects it
// the function should receive
    // - exercice Id
    // - professor's last name
    // - professor's first name
    // - professor's email
    // - professor's role
    // - Note attribué

// The function should return 
    // - boolean if save was successful

function saveProfessorCorrection(){

}


exports.saveExercice = saveExercice;
exports.getExercicesForTeacher = getExercicesForTeacher;
exports.getExercicesForStudents = getExercicesForStudents;