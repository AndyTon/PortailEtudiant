function onPageLoad(){
    populateallSection();
}

function populateallSection(){
    fetch('http://localhost:4000/exercice/getExercicesForTeacher', {
        method: 'GET',
        headers: {
            'email': getEmailFromCookies()
        }
    }).then((response) =>{
        if(response.ok){
            return response.json();
        }
    }).then((result) =>{
        console.log(result);
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

function toAccueil(){
    window.location.href = "http://localhost:2000/accueilProf";
}

function back(){
    window.location.href = "http://localhost:2000/accueilProf";
}