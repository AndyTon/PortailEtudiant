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
        let id_eleve = result[i].id_eleve;
        let enonce = result[i].enonce_exercice;
        let email = result[i].email;
        let prenom = result[i].prenom;
        let nom = result[i].nom;
        buildExerciseCard(id_exercice, id_eleve, enonce, email, prenom, nom);
        
    }
}

function buildExerciseCard(id_exercice, id_eleve, enonce, email, prenom, nom){
    let mainDiv = document.createElement('DIV');
    mainDiv.setAttribute('class', 'studentCard');
    mainDiv.setAttribute('onclick', 'toStudentExercise(this)');

    let hiddenExerciseIdDiv = document.createElement('DIV');
    hiddenExerciseIdDiv.setAttribute('class', 'hiddenId');
    hiddenExerciseIdDiv.innerText = id_exercice;

    let hiddenStudentIdDiv = document.createElement('DIV');
    hiddenStudentIdDiv.setAttribute('class', 'hiddenId');
    hiddenStudentIdDiv.innerText = id_eleve;

    let enonceDiv = document.createElement('DIV');
    let titre = enonce.slice(0,enonce.indexOf('>'));
    enonceDiv.innerText = `Exercice: ${titre}`;

    let nameDiv = document.createElement('DIV');
    nameDiv.innerText = `Étudiant: ${prenom} ${nom}`;

    let emailDiv = document.createElement('DIV');
    emailDiv.innerText = `Adresse Courriel: ${email}`

    mainDiv.appendChild(hiddenExerciseIdDiv);
    mainDiv.appendChild(hiddenStudentIdDiv);
    mainDiv.appendChild(enonceDiv);
    mainDiv.appendChild(nameDiv);
    mainDiv.appendChild(emailDiv);

    document.getElementById('allSection').appendChild(mainDiv);
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

function toStudentExercise(div){
    let id_exercice = div.firstChild.innerText;
    let id_student = div.children[1].innerText;
    console.log(id_exercice);
    console.log(id_student);
    window.location.href = `http://localhost:2000/correction?idE=${id_exercice}&IdS=${id_student}`;
}