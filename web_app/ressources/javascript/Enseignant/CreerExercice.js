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
    } else if(val === "Question à choix multiple"){
        var generalDiv = document.createElement('div');

        var radioForm = document.createElement('div');
        radioForm.setAttribute('class', 'form-check');

        var radioObject = document.createElement("INPUT");
        radioObject.setAttribute('class', 'form-check-input');
        radioObject.setAttribute("type", "radio");
        radioObject.setAttribute('name', "radio"+counter++);
        radioObject.checked = true;

        var radioLabel = document.createElement('LABEL');
        radioLabel.innerHTML = "option1";
        radioLabel.setAttribute('class', 'form-check-label');
        radioLabel.setAttribute('contenteditable', 'true');

        radioForm.appendChild(radioObject);
        radioForm.appendChild(radioLabel);
        
        var addRadioButton = document.createElement('BUTTON');
        addRadioButton.setAttribute('class', 'row btn btn-primary btn-sm');
        addRadioButton.setAttribute('style', 'margin-left: 0px;');
        addRadioButton.setAttribute('onclick', 'addMultipleChoiceOption(this)');
        addRadioButton.innerHTML = "Add option";

        generalDiv.appendChild(radioForm);
        generalDiv.appendChild(addRadioButton);

        answerOption = generalDiv;
    }

    

    div.appendChild(questionNode);
    div.appendChild(answerOption);

    questionSection.appendChild(div);

}

var counter=0;
function save(){

    //get Titre
    var titre = document.getElementById('titre').innerText;

    //get Énoncé
    var enonce = document.getElementById('enonce').innerText;

    //get Questions
    var questions = document.getElementById('questionSection').children;

    var questionsList = [];
    for(let i=0; i<questions.length; i++){
        let stringified;

        let innerText; //question text
        let tagName = questions[i].children[1].tagName; //type of answer

        if(tagName === "TEXTAREA"){
            innerText = questions[i].innerText;
            let nbRows = questions[i].children[1].rows;
            let solution = questions[i].children[1].value;
            stringified = `${innerText}:${tagName}:${nbRows}:${solution}`;
        } else if(tagName === "DIV"){
            innerText = questions[i].children[0].innerText;
            let radioOptionsDiv = questions[i].children[1];
            let stringOption = radioOptionsDiv.children[0].children[1].innerHTML;

            if(radioOptionsDiv.children[0].children[0].checked){
                stringOption += "!checked";
            }

            for(let i=1; i<radioOptionsDiv.children.length - 1; i++){
                stringOption += `>${radioOptionsDiv.children[i].children[1].innerHTML}`;
                if(radioOptionsDiv.children[i].children[0].checked){
                    stringOption += "!checked";
                }
            }

            stringified = `${innerText}:${tagName}:${stringOption}`;
        }

        questionsList.push(stringified);
    }

    var objToBeSent = {titre: titre, enonce: enonce, questions: questionsList};
    var jsonObjToBeSent = JSON.stringify(objToBeSent);

    fetch('http://localhost:4000/exercice/saveExercise', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'lastName': getLastNameFromCookies(),
            'firstName': getFirstNameFromCookies(),
            'email': getEmailFromCookies(),
            'role': getRoleFromCookies()
          },
          
        method: 'POST',
        body: jsonObjToBeSent
    }).then((response) => {
        console.log(response);
    })
}

function addMultipleChoiceOption(button){
    
    let generalDiv = button.parentNode;
    let inputName = generalDiv.firstChild.firstChild.getAttribute('name');

    let radioForm = document.createElement('div');
        radioForm.setAttribute('class', 'form-check');

        var radioObject = document.createElement("INPUT");
        radioObject.setAttribute('class', 'form-check-input');
        radioObject.setAttribute("type", "radio");

        var radioLabel = document.createElement('LABEL');
        radioLabel.innerHTML = "option";
        radioLabel.setAttribute('class', 'form-check-label');
        radioLabel.setAttribute('contenteditable', 'true');
        radioObject.setAttribute('name', inputName);

        radioForm.appendChild(radioObject);
        radioForm.appendChild(radioLabel);

    generalDiv.insertBefore(radioForm, button);
}