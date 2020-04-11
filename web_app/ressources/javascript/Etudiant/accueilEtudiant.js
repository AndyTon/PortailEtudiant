function onPageLoad(){
    checkForCookies();
}

function checkForCookies(){
    if(document.cookie != ""){
        checkForCredentials();
        changeMainTitle();
        populateAllExerciseSection();
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
            window.location.href = "http://localhost:2000/accueilEtudiant";
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

function populateAllExerciseSection(){
    fetch('http://localhost:4000/exercice/getExercicesForStudents', {
        method: 'GET',
        headers: {
            'email': getEmailFromCookies()
        }
    }).then((response) =>{
        if(response.ok){
            return response.json();
        }
    }).then((result) =>{
        resultToHTML(result);
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

function buildExerciseCard(id, enonce, email, prenom, nom){
    let mainDiv = document.createElement('DIV');
    mainDiv.setAttribute('class', 'exerciceCard');
    mainDiv.setAttribute('onclick', 'toExercise(this)');

    let hiddenIdDiv = document.createElement('DIV');
    hiddenIdDiv.setAttribute('class', 'hiddenId');
    hiddenIdDiv.innerText = id;

    let enonceDiv = document.createElement('DIV');
    enonceDiv.innerText = `Exercice: ${enonce.slice(0,enonce.indexOf('>'))}`;
    
    let nameDiv = document.createElement('DIV');
    nameDiv.innerText = `Enseignant: ${prenom} ${nom}`;
    
    let emailDiv = document.createElement('DIV');
    emailDiv.innerText = `Adresse courriel: ${email}`;

    mainDiv.appendChild(hiddenIdDiv);
    mainDiv.appendChild(enonceDiv);
    mainDiv.appendChild(nameDiv);
    mainDiv.appendChild(emailDiv);

    document.getElementById('allExerciceSection').appendChild(mainDiv);
}

function toExercise(div){
    let id_exercice = div.firstChild.innerText;
    window.location.href = `http://localhost:2000/exercice?id=${id_exercice}`;
}

function toAccueil(){
    window.location.href = "http://localhost:2000/accueilEtudiant";
}

function back(){
    window.location.href = "http://localhost:2000/accueilEtudiant";
}