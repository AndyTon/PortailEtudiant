function onPageLoad(){
  checkForCookies();
}

function checkForCookies(){
  if (document.cookie != "") {
    checkForCredentials();
  }
}

function checkForCredentials(){
  fetch('http://localhost:3000/user/checkCredentials', {
      method: 'GET',
      headers: {
          'lastName': getLastNameFromCookies(),
          'firstName': getFirstNameFromCookies(),
          'email': getEmailFromCookies(),
          'role': getRoleFromCookies()
      }
  })
  .then((response) => {
      if(response.ok){
          role = getRoleFromCookies();

          if(role == "Enseignant"){
              window.location.href = "http://localhost:2000/accueilProf";
          } else if(role == "Étudiant") {
              window.location.href = "http://localhost:2000/accueilEtudiant";
          }
      } else {
          deleteAllCookies();
      }
  });
}

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function getLastNameFromCookies(){
  var arrayCookies = document.cookie.split(';');

  for (x of arrayCookies){
      if(x.includes('lastName=')){
          return x.substring('lastName='.length, x.length);
      }
  }
}

function getFirstNameFromCookies(){
  var arrayCookies = document.cookie.split(';');

  for (x of arrayCookies){
      if(x.includes('firstName=')){
          return x.substring('firstName='.length+1, x.length);
      }
  }
}

function getEmailFromCookies(){
  var arrayCookies = document.cookie.split(';');

  for (x of arrayCookies){
      if(x.includes('email=')){
          return x.substring('email='.length+1, x.length);
      }
  }
}

function getRoleFromCookies(){
  var arrayCookies = document.cookie.split(';');

  for (x of arrayCookies){
      if(x.includes('role=')){
          return x.substring('role='.length+1, x.length);
      }
  }
}

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const email = document.getElementById("email");

// Form
const form = document.getElementById("myForm");
// colors
const green = "#4CAF50";
const red = "#F44336";

//confirmation msg
form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (
    validateFirstName() &&
    validateLastName() &&
    validatePassword() &&
    validateConfirmPassword() &&
    validateEmail()
  ) {
    const name = firstName.value;
    const container = document.querySelector("div.container");
    const loader = document.createElement("div");
    loader.className = "progress";
    const loadingBar = document.createElement("div");
    loadingBar.className = "indeterminate";
    loader.appendChild(loadingBar);
    container.appendChild(loader);
    setTimeout(function() {
      const loaderDiv = document.querySelector("div.progress");
      const panel = document.createElement("div");
      panel.className = "card-panel green";
      const text = document.createElement("span");
      text.className = "white-text";
      text.appendChild(
        document.createTextNode(
          `Inscription réussie, bienvenue sur le protail étudiant ${name}`
        )
      );
      panel.appendChild(text);
      container.replaceChild(panel, loaderDiv);
    }, 1000);

    register();
  } 
});

// Validators
///////////////////////////////////////////

function validateFirstName() {
  if (checkIfEmpty(firstName)) return;
  if (!checkIfOnlyLetters(firstName)) return;
  return true;
}
function validateLastName() {
  if (checkIfEmpty(lastName)) return;
  if (!checkIfOnlyLetters(lastName)) return;
  return true;
}
function validatePassword() {
  if (checkIfEmpty(password)) return;
  if (!meetLength(password, 4, 100)) return;
  return true;
}
function validateConfirmPassword() {
  if (password.className !== "valid") {
    setInvalid(confirmPassword, "Le mot de passe doit être valide");
    return;
  }
  if (password.value !== confirmPassword.value) {
    setInvalid(confirmPassword, "les mots de passe doivent correspondre");
    return;
  } else {
    setValid(confirmPassword);
  }
  return true;
}
function validateEmail() {
  if (checkIfEmpty(email)) return;
  if (!containsCharacters(email, 5)) return;
  return true;
}
function checkIfEmpty(field) {
  if (isEmpty(field.value.trim())) {
    setInvalid(field, `${field.name} ne doit pas être vide`);
    return true;
  } else {
    setValid(field);
    return false;
  }
}
function isEmpty(value) {
  if (value === "") return true;
  return false;
}
function setInvalid(field, message) {
  field.className = "invalid";
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
}
function setValid(field) {
  field.className = "valid";
  field.nextElementSibling.innerHTML = "";
}
function checkIfOnlyLetters(field) {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} ne doit contenir que des lettres`);
    return false;
  }
}
function meetLength(field, minLength, maxLength) {
  if (field.value.length >= minLength && field.value.length < maxLength) {
    setValid(field);
    return true;
  } else if (field.value.length < minLength) {
    setInvalid(
      field,
      `${field.name} doit être au moins ${minLength} caractères`
    );
    return false;
  } else {
    setInvalid(
      field,
      `${field.name} doit être plus court que ${maxLength} caractères`
    );
    return false;
  }
}
function containsCharacters(field, code) {
  let regEx;
  switch (code) {
    case 1:
      regEx = /(?=.*[a-zA-Z])/;
      return matchWithRegEx(regEx, field, "Doit contenir au moins une lettre");
    case 2:
      regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        "Doit contenir au moins une lettre et un chiffre"
      );
    case 3:
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        "Doit contenir au moins une majuscule, une lettre minuscule et un chiffre"
      );
    case 4:
      // uppercase, lowercase, number and special char
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      return matchWithRegEx(
        regEx,
        field,
        "Doit contenir au moins une majuscule, une lettre minuscule, un chiffre et un caractère spécial"
      );
    case 5:
      // Email pattern
      regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return matchWithRegEx(
        regEx,
        field,
        "l adresse courriel doit être une adresse valide"
      );
    default:
      return false;
  }
}
function matchWithRegEx(regEx, field, message) {
  if (field.value.match(regEx)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, message);
    return false;
  }
}

function toLoginPage() {
  window.location.href = "http://localhost:2000/login";
}

function register(){
  var lastNameElement = document.getElementById('lastName');
  var lastName = lastNameElement.value;

  var firstnameElement = document.getElementById('firstName');
  var firstName = firstnameElement.value;

  var passwordElement = document.getElementById('password');
  var password = passwordElement.value;

  var emailElement = document.getElementById('email');
  var email = emailElement.value;
  
  var selectElement = document.getElementById('select');
  var role = selectElement[selectElement.selectedIndex].innerText;

  fetch('http://localhost:3000/user/register', {
    method: 'POST',
    headers: {
      'lastName': lastName,
      'firstName': firstName,
      'password': password,
      'email': email,
      'role': role
    }
  })
    .then((response) => {
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((result) => {
      document.cookie = "lastName="+result.lastName;
      document.cookie = "firstName="+result.firstName;
      document.cookie = "email="+result.email;
      document.cookie = "role="+result.role;
      document.cookie = "id="+result.id;

      if(result.role == 'Étudiant'){
        window.location.href = "http://localhost:2000/accueilEtudiant";
      } else if(result.role == 'Enseignant'){
        window.location.href = "http://localhost:2000/accueilProf";
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })

}