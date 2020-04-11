function onPageLoad(){
    checkForCookies();
}

function checkForCookies(){
    if(document.cookie != ""){
        checkForCredentials();
        changeMainTitle();
    } else {
        window.location.href = "http://localhost:2000/login";
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
        if(!response.ok){
            return response.json();
        }
    })
    .then((result) => {
        document.cookie = "lastName="+result.lastName;
        document.cookie = "firstName="+result.firstName;
        document.cookie = "email="+result.email;
        document.cookie = "role="+result.role;

        if(result.role == "Enseignant"){
            window.location.href = "http://localhost:2000/accueilProf";
        }
    });
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

function changeMainTitle() {
    let firstName = '';
    let lastName = '';
    var arrayCookies = document.cookie.split(';');
    for (x of arrayCookies) {
        if (x.includes('lastName=')) {
            lastName = x.substring('lastName='.length, x.length);
        }
        else if (x.includes('firstName=')) {
            firstName = x.substring('firstName='.length + 1, x.length);
        }
    }
    document.getElementById('bannerText').innerText = "Bienvenue " + firstName + " " + lastName;
}

function toVoirEleves(){
    window.location.href = "http://localhost:2000/voirEleves";
}

function toCreerExercice(){
    window.location.href = "http://localhost:2000/CreerExercice";
}

function toCorrigerExercice(){
    window.location.href = "http://localhost:2000/CorrigerExercice";
}

function toAccueil(){
    window.location.href = "http://localhost:2000/accueilProf";
}

function back(){
    window.location.href = "http://localhost:2000/accueilProf";
}