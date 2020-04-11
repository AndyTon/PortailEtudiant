function onPageLoad(){
    checkForCookies();
}

function checkForCookies(){
    if(document.cookie != ""){
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

const form = document.getElementById('myForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
});

function toRegisterPage() {
    window.location.href = "http://localhost:2000/register";
}

const red = "#F44336";

function validate_login() {
    var userElement = document.getElementById('email');
    var user = userElement.value;

    var pwElement = document.getElementById('password')
    var pw = pwElement.value;

    fetch('http://localhost:3000/user/login', {
        method: 'GET',
        headers: {
            'user': user,
            'pw': pw
        }
    })
        .then((response) => {
            if(!response.ok){
                userElement.nextElementSibling.innerHTML = "Invalid Username or Password";
                userElement.nextElementSibling.style.color = red;

                pwElement.nextElementSibling.innerHTML = "Invalid Username or Password";
                pwElement.nextElementSibling.style.color = red;
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((result) =>{
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
        });

}