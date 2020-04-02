function onPageLoad(){
    checkForCredentials();
    changeMainTitle();
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
            window.location.href = "http://localhost:2000/accueilEtudiant";
        }
    })
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

function toAccueil(){
    window.location.href = "http://localhost:2000/accueilProf";
}
