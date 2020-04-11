var exerciceService = require("../controller/exercice");
var con;

let profEmail = "test@testingservice.ca";
let profNom = "test";
let profPrenom = "test";
let profRole = 1;
let profPw = "testpw";

let studentEmail = "test2@testingservice.ca";
let studentNom = "test2";
let studentPrenom = "test2";
let studentRole = 0;
let studentPw = "testpw2";

function runAllTests(connection) {
  con = connection;

  console.log("RUNNING TESTS FOR EXERCICE_SERVICE\n");
  AddTestUsers();

  runExerciceTests();

  cleanupTestUser();
}

function runExerciceTests() {
    validExercice_saveExercice_assertTrue();
    // validInformation_saveSolutionForStudent_AssertTrue();
}

function validExercice_saveExercice_assertTrue() {
  let functionName = "validExercice_saveExercice_assertTrue";
  // Arrange
  let enonce = "TEST ENONCE";
  let questions = "TEST QUESTIONS";

  // Act
  try {
    exerciceService.saveExercice(con, profEmail, enonce, questions, function (result) {
      // Assert
      if (result) {
        // Succesfful assert
        console.log(`${functionName} OK`);
        cleanup_validExercice_saveExercice_assertTrue();
      } else {
        // Bad assert
        console.log(`${functionName} FAILED`);
      }
    });
  } catch (err) {
    console.log(`Exception lifted for ${functionName}`);
  }
}

function cleanup_validExercice_saveExercice_assertTrue(){
    let sql = `DELETE FROM exercices WHERE email='${profEmail}'`;
    con.query(sql, function(err,result){
        if (err) {
            console.log(
              "------------> cleanup_validExercice_saveExercice_assertTrue FAILED"
            );
          } else {
            console.log(
              "------------> cleanup_validExercice_saveExercice_assertTrue SUCCESSFUL"
            );
          }
    })
}

// function validInformation_saveSolutionForStudent_AssertTrue(){
//     let functionName = 'validInformation_saveSolutionForStudent_AssertTrue';
//     // Arrange
//     let enonce = "TEST ENONCE";
//     let questions = "TEST QUESTIONS";
//     let sql = 'SELECT id_exercice, id_prof FROM exercices';
//     let sql2 = `SELECT id FROM utilisateurs WHERE email=${studentEmail}`;

//     exerciceService.saveExercice(con, profEmail, enonce, questions, function(result){

//     });

//     let solution = "testSol";
//     // Act
//     con.query(sql, (err, result) => {
//         con.query(sql2, (err, result2) => {
//             exerciceService.saveSolutionForStudent(con, result[0].id_exercice, result[0].id_prof, result2[0].id, studentEmail, solution, function(result){
//                 // Assert
//                 if (result) {
//                 // Succesfful assert
//                     console.log(`${functionName} OK`);
//                     cleanup_validInformation_saveSolutionForStudent_AssertTrue();
//                 } else {
//                 // Bad assert
//                     console.log(`${functionName} FAILED`);
//                 }
//             })
//         })
//     })
// }

// function cleanup_validInformation_saveSolutionForStudent_AssertTrue(){
//     let sql = `DELETE FROM solution_eleve WHERE email='${studentEmail}'`;
//     con.query(sql, function(err,result){
//         if (err) {
//             console.log(
//               "------------> cleanup_validInformation_saveSolutionForStudent_AssertTrue FAILED"
//             );
//           } else {
//             console.log(
//               "------------> cleanup_validInformation_saveSolutionForStudent_AssertTrue SUCCESSFUL"
//             );
//           }
//     })
// }

function validEmail_getExercicesForTeacher_AssertTrue(){
    // Arrange

    // Act
    exerciceService.getExercicesForTeacher(con, profEmail, function(result){

    });
}

function AddTestUsers() {
  let query = `INSERT INTO utilisateurs(nom, prenom, email, pw, prof) VALUES("${profNom}", "${profPrenom}", "${profEmail}", "${profPw}", ${profRole})`;
  con.query(query);

  let query2 = `INSERT INTO utilisateurs(nom, prenom, email, pw, prof) VALUES("${studentNom}", "${studentPrenom}", "${studentEmail}", "${studentPw}", ${studentRole})`;
  con.query(query2);
}

function cleanupTestUser() {
  let query = "DELETE FROM utilisateurs WHERE email='test@testingservice.ca'";
  con.query(query);

  let query2 = "DELETE FROM utilisateurs WHERE email='test2@testingservice.ca'";
  con.query(query2);
}

exports.runAllTests = runAllTests;
