var loginService = require("../controller/login.js");
var registerService = require("../controller/register.js");
var credentialsService = require("../controller/credentials.js");

var con;

function runAllTests(connection) {
  con = connection;

  console.log("RUNNING TESTS FOR USER_SERVICE\n");
  AddTestUsers();

  runLoginTests();
  runRegisterTests();
  runCredentialsTests();

  cleanupTestUser();
}

function AddTestUsers(){
    let query = 'INSERT INTO utilisateurs(nom, prenom, email, pw, prof) VALUES("test", "test", "test@testingservice.ca", "testpw", 1)';
    con.query(query);
}

function cleanupTestUser(){
    let query = "DELETE FROM utilisateurs WHERE email='test@testingservice.ca'";
    con.query(query);
}

function runLoginTests() {
  ValidUser_validateLogin_AssertTrue();
  InvalidUser_validateLogin_AssertFalse();
}

function ValidUser_validateLogin_AssertTrue() {
  let functionName = "ValidUser_validateLogin_AssertTrue";
  // Arrange
  let user = "test@test.ca";
  let pw = "123";

  // Act
  try {
    loginService.validateLogin(user, pw, con, function (result) {
      // Assert
      if (result) {
        // Succesfful assert
        console.log(`${functionName} OK`);
      } else {
        // Bad assert
        console.log(`${functionName} FAILED`);
      }
    });
  } catch (err) {
    console.log(`Exception lifted for ${functionName}`);
  }
}

function InvalidUser_validateLogin_AssertFalse() {
  let functionName = "InvalidUser_validateLogin_AssertFalse";
  // Arrange
  let user = "idontexist";
  let pw = "1awerawer3";

  // Act
  try {
    loginService.validateLogin(user, pw, con, function (result) {
      // Assert
      if (!result) {
        // good assert
        console.log(`${functionName} OK`);
      } else {
        // Bad assert
        console.log(`${functionName} FAILED`);
      }
    });
  } catch (err) {
    console.log(`Exception lifted for ${functionName}`);
  }
}

function runRegisterTests() {
  validCredentials_validateRegister_AssertTrue();
  duplicateCredentials_validateRegister_AssertFalse();
}

function validCredentials_validateRegister_AssertTrue() {
  let functionName = "validCredentials_validateRegister_AssertTrue";
  // Arrange
  let lastName = "userLastname";
  let firstName = "userFirstName";
  let password = "random";
  let email = "userEmail";
  let role = "Enseignant";

  // Act
  try {
    registerService.validateRegister(
      con,
      lastName,
      firstName,
      password,
      email,
      role,
      function (result, errorMessage) {
        // Assert
        if (result) {
          // good assert
          console.log(`${functionName} OK`);
          cleanup_validCredentials_validateRegister_AssertTrue();
        } else {
          // Bad assert
          console.log(`${functionName} FAILED ${errorMessage}`);
        }
      }
    );
  } catch (err) {
    console.log(`Exception lifted for ${functionName}`);
  }
}

function cleanup_validCredentials_validateRegister_AssertTrue() {
  let sql = "DELETE FROM utilisateurs WHERE email='userEmail';";
  con.query(sql, function (err, result) {
    if (err) {
      console.log(
        "------------> cleanup validCredentials_validateRegister_AssertTrue FAILED"
      );
    } else {
      console.log(
        "------------> cleanup validCredentials_validateRegister_AssertTrue SUCCESSFUL"
      );
    }
  });
}

function duplicateCredentials_validateRegister_AssertFalse() {
  let functionName = "duplicateCredentials_validateRegister_AssertTrue";
  // Arrange
  let lastName = "duplicateLastname";
  let firstName = "duplicateFirstName";
  let password = "random";
  let email = "duplicateuserEmail";
  let role = "Enseignant";

  // Act
  try {
    registerService.validateRegister(
      con,
      lastName,
      firstName,
      password,
      email,
      role,
      function (result) {
        if (result) {
          registerService.validateRegister(
            con,
            lastName,
            firstName,
            password,
            email,
            role,
            function (result, errorMessage) {
              // Assert
              if (!result && errorMessage != null) {
                // good assert
                console.log(`${functionName} OK`);
                cleanup_duplicateCredentials_validateRegister_AssertFalse();
              } else {
                // Bad assert
                console.log(`${functionName} FAILED`);
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(`Exception lifted for ${functionName}`);
  }
}

function cleanup_duplicateCredentials_validateRegister_AssertFalse() {
  let sql = "DELETE FROM utilisateurs WHERE email='duplicateuserEmail';";
  con.query(sql, function (err, result) {
    if (err) {
      console.log(
        "------------> cleanup duplicateCredentials_validateRegister_AssertFalse FAILED"
      );
    } else {
      console.log(
        "------------> cleanup duplicateCredentials_validateRegister_AssertFalse SUCCESSFUL"
      );
    }
  });
}

function runCredentialsTests(){
    validCredentials_validateCredentials_AssertTrue();
    partialValidCredentials_validateCredentials_AssertFalse();
}

function validCredentials_validateCredentials_AssertTrue(){
    let functionName = "validCredentials_validateCredentials_AssertTrue";
    // Arrange
    let lastName = 'test';
    let firstName = 'test';
    let email = 'test@testingservice.ca';
    let role = 'Enseignant';

    // Act
    credentialsService.validateCredentials(lastName, firstName, email, role, con, function(result){
        // Assert
        if (result) {
            // good assert
            console.log(`${functionName} OK`);
          } else {
            // Bad assert
            console.log(`${functionName} FAILED`);
          }
    });
}

function partialValidCredentials_validateCredentials_AssertFalse(){
    let functionName = "partialValidCredentials_validateCredentials_AssertTrue";
    // Arrange
    let lastName = 'testawerawer';
    let firstName = 'testawer';
    let email = 'test@testingservice.ca';
    let role = 'Enseignant';

    // Act
    credentialsService.validateCredentials(lastName, firstName, email, role, con, function(result, user){
        // Assert
        if (!result && user != null) {
            // good assert
            console.log(`${functionName} OK`);
          } else {
            // Bad assert
            console.log(`${functionName} FAILED`);
          }
    });
}

exports.runAllTests = runAllTests;
