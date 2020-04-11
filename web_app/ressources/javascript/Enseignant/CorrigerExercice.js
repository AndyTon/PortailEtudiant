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
        if(result != ""){
            resultToHTML(result);
        } else {
            document.getElementById('allExerciceSection').innerText = "Vous n'avez aucun exercice à corriger :)";
        }
    });
}

function resultToHTML(result){
    for(let i=0; i<result.length; i++){
        let id_exercice = result[i].id_exercice;
        let enonce = result[i].enonce_exercice;
        let email = result[i].email;
        let prenom = result[i].prenom;
        let nom = result[i].nom;
        buildExerciseCard(id_exercice, enonce, email, prenom, nom);
        
    }
}

function buildExerciseCard(id_exercice, enonce, email, prenom, nom){

    let titre = enonce.slice(0,enonce.indexOf('>'));
    console.log(titre);
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