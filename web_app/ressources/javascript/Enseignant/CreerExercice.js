function onPageLoad(){
    populateStudents();
}

function populateStudents(){
    var table = document.getElementById('studentTable');

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
            insertRow(table, result[i].id, result[i].nom, result[i].prenom);
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

function insertRow(table, id, nom, prenom){
    var row = table.insertRow(table.rows.length);

    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);

    let textToBeInserted = `${nom}, ${prenom}`;

    cell0.innerHTML = id;
    cell1.innerHTML = textToBeInserted;
}

function AddQuestion(){
    var questionSection = document.getElementById('questionSection');

    var div = document.createElement('div');

    var questionNode = document.createElement('LABEL');
    var questionTextNode = document.createTextNode('Voici ma question!');
    questionNode.appendChild(questionTextNode);
    questionNode.setAttribute('contenteditable', 'true');

    var answerOption;

    var optionQuestion = document.getElementById('questionType');
    var val = optionQuestion.options[optionQuestion.selectedIndex].value

    if(val === "Question à courte réponse"){
        var textArea = document.createElement("TEXTAREA");
        textArea.setAttribute('class', 'form-control');
        answerOption = textArea;
    } else if(val === "Question à développement"){
        var textArea = document.createElement("TEXTAREA");
        textArea.setAttribute('class', 'form-control');
        textArea.setAttribute('rows', '10');
        answerOption = textArea;
    } 

    div.appendChild(questionNode);
    div.appendChild(answerOption);

    questionSection.appendChild(div);

}