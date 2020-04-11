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

function saveExercice(con, email, enonce, questions, callback){
    // A faire apres
    let sql = "INSERT INTO exercices(id_prof, enonce_exercice, email, questions) VALUES ( (SELECT id FROM utilisateurs WHERE email='"+email+"'),'"+enonce+"','"+email+"','"+questions+"')";

    con.query(sql, (err, resultat) => {
        if (err) throw err;

            return callback(true);
    });
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

function getExercicesForTeacher(con, email, callback){
    let sql = "SELECT enonce_exercice,id_eleve,nom,prenom,solution_eleve.email FROM  exercices, solution_eleve left join utilisateurs ON id_eleve=id where solution_eleve.id_exercice in (SELECT id_exercice FROM exercices WHERE email='"+email+"') AND prof=0 AND solution_eleve.id_exercice=exercices.id_exercice";

    con.query(sql, (err, resultat) => {
        if (err) throw err;

            return callback(true,resultat);

    });
}

// The function will receive the Student account details.
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
//Retourne tout les exercices qui ne sont pas faites par cet etudiant
function getExercicesForStudents(con, email, callback){
    let sql = "SELECT id_exercice, enonce_exercice, exercices.email, prenom, nom FROM exercices LEFT JOIN utilisateurs ON id=id_prof WHERE id_exercice NOT IN (SELECT id_exercice FROM solution_eleve WHERE email='"+email+"')";

    con.query(sql, (err, resultat) => {
        if (err) throw err;

        return callback(true,resultat);

    });
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

    let sql = "SELECT id_exercice,id_prof,enonce_exercice,questions FROM exercices WHERE id_exercice="+exerciceId;

    con.query(sql, (err, resultat) => {
        if (err) throw err;

        return callback(true,resultat);

    });
}

// This function is for the student to complete his exercise and submit his solution.
// The function should receive
    // - exercice Id
    // - id prof
    // - solution eleve
    // peut tu m'envoyer l'email de l'etudiant ainsi que son ID ici aussi stp

// The function should return:
    // boolean if save was successful

function saveSolutionForStudent(con, exerciceId, idprof,idEleve, emailE, solutionEleve, callback){
    let sql = "INSERT INTO solution_eleve(id_eleve, id_prof, id_exercice, solutionE, email) VALUES ("+idEleve+","+idprof+","+exerciceId+",'"+solutionEleve+"', '"+emailE+"')";

    con.query(sql, (err, resultat) => {
        if (err) throw err;

            return callback(true);
    });
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

function saveProfessorCorrection(idprof,ideleve,idExercice,note){
    let sql = "update solution_eleve set note_attribue="+note+" where id_prof="+idprof+" and id_eleve="+ideleve+" and id_exercice="+exerciceId+"" ;

    con.query(sql, (err, resultat) => {
        if (err) throw err;

            return callback(true);
    });
}


exports.saveExercice = saveExercice;
exports.getExercicesForTeacher = getExercicesForTeacher;
exports.getExercicesForStudents = getExercicesForStudents;
exports.getExerciceForStudent = getExerciceForStudent;