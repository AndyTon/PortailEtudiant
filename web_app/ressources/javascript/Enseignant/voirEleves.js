function onPageLoad(){
    populateStudents();
}

function populateStudents(){
    var table = document.getElementById('studentsTable');

    fetch('http://localhost:3000/user/getStudents', {
        method: 'GET',
        headers: {
            'lastName': getLastNameFromCookies(),
            'firstName': getFirstNameFromCookies(),
            'email': getEmailFromCookies(),
            'role': getRoleFromCookies()
        }
    }).then((response) =>{
        if(response.ok){
            return response.json();           
        }
    }).then((result) =>{
        for(let i=0; i<result.length; i++){
            insertRow(table, result[i].nom, result[i].prenom, result[i].email);
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

function insertRow(table, firstCell, secondCell, thirdCell){
    var row = table.insertRow(table.rows.length);

    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);

    cell0.innerHTML = firstCell;
    cell1.innerHTML = secondCell;
    cell2.innerHTML = thirdCell;
}

function toAccueil(){
    window.location.href = "http://localhost:2000/accueilProf";
}

function back(){
    window.location.href = "http://localhost:2000/accueilProf";
}