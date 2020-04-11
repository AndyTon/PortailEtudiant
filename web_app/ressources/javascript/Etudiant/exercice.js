function onPageLoad() {
  populateExercise();
}

function populateExercise() {
  let url = "http://localhost:4000/exercice/getExerciceForStudent";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id = urlParams.get("id");

  fetch(url, {
    method: "GET",
    headers: {
      id: id,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((result) => {
      let idProf = result[0].id_prof;
      let titre = result[0].enonce_exercice.slice(
        0,
        result[0].enonce_exercice.indexOf(">")
      );
      let enonce_exercice = result[0].enonce_exercice.slice(
        result[0].enonce_exercice.indexOf(">") + 1,
        result[0].enonce_exercice.length
      );
      let questions = result[0].questions;
      resultToHTML(idProf, titre, enonce_exercice, questions);
    });
}

function resultToHTML(idProf, titre, enonce_exercice, questions) {
  document.getElementById("idProf").innerText = idProf;
  document.getElementById("titre").innerText = titre;
  document.getElementById("enonce").innerText = enonce_exercice;

  questions.split(",").map((question) => {
    let arr = question.split(':');
    if(arr[1] == "TEXTAREA"){
        addTextArea(arr[0], arr[2]);
    } else if(arr[1] == "DIV"){
        addRadioArea(arr[0], arr[2]);
    }
    solCounter++;
  });
}

function addTextArea(question, numberRows){
    let questionSection = document.getElementById('questionSection');

    var { div, questionNode } = setQuestionArea(question);

    var textArea = document.createElement("TEXTAREA");
    textArea.setAttribute('class', 'form-control');
    textArea.setAttribute('rows', numberRows);
    textArea.setAttribute('id', `solution${solCounter}`)

    div.appendChild(questionNode);
    div.appendChild(textArea);

    questionSection.appendChild(div);
}

function setQuestionArea(question) {
    var div = document.createElement('DIV');
    var questionNode = document.createElement('LABEL');
    var questionTextNode = document.createTextNode(question);
    questionNode.appendChild(questionTextNode);
    return { div, questionNode };
}

var counter=0;
var solCounter=0;

function addRadioArea(question, options){
    let questionSection = document.getElementById('questionSection');

    var { div, questionNode } = setQuestionArea(question);

    var generalDiv = document.createElement('div');
    generalDiv.setAttribute('id', `solution${solCounter}`)
    // option1>option!checked
    options.split('>').map(option => {
        let optionName = option;

        if(option.split('!').length > 1){
            optionName = option.split('!')[0];
        }

        var radioForm = document.createElement('div');
        radioForm.setAttribute('class', 'form-check');

        var radioObject = document.createElement("INPUT");
        radioObject.setAttribute('class', 'form-check-input');
        radioObject.setAttribute("type", "radio");
        radioObject.setAttribute('name', "radio"+counter);

        var radioLabel = document.createElement('LABEL');
        radioLabel.innerHTML = optionName;
        radioLabel.setAttribute('class', 'form-check-label');

        radioForm.appendChild(radioObject);
        radioForm.appendChild(radioLabel);

        generalDiv.appendChild(radioForm);
    });

    div.appendChild(questionNode);
    div.appendChild(generalDiv);

    questionSection.appendChild(div);
}

function toAccueil() {
  window.location.href = "http://localhost:2000/accueilEtudiant";
}

function back() {
  window.location.href = "http://localhost:2000/accueilEtudiant";
}

function soumettre(){
  let email = getEmailFromCookies();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let idExercice = urlParams.get("id");

  let idProf = document.getElementById('idProf').innerText;

  let idEleve = getIDfromCookies();

  let solutionStringified = buildSolution();

    fetch("http://localhost:4000/exercice/saveSolutionForStudent", {
      method: "POST",
      headers: {
        'idExercice': idExercice,
        'idProf': idProf,
        'idEleve': idEleve,
        'email': email,
        'solution': solutionStringified
      }
    })
    .then((response) => {
      if(response.ok){
        window.location.href = "http://localhost:2000/accueilEtudiant";
      }
    });
}
function buildSolution(){
  let solutionDiv = document.getElementById('questionSection');
  let stringified = "";

  let solution = document.getElementById(`solution0`);
    if(solution.nodeName === "TEXTAREA"){
      stringified = solution.value;
    } else if(solution.nodeName === "DIV") {
      console.log('hey');
    }

  for(let i=1; i<solutionDiv.childElementCount; i++){
    solution = document.getElementById(`solution${i}`);
    if(solution.nodeName === "TEXTAREA"){
      stringified = `${stringified}:${solution.value}`;
    } else if(solution.nodeName === "DIV") {
      
      for(let j=0;j<solution.childElementCount; j++){
        if(solution.children[j].children[0].checked){
          stringified = `${stringified}:Checked-${j}`;
        }
      }

    }
  }

  return stringified;
}

function getEmailFromCookies(){
  var arrayCookies = document.cookie.split(';');

  for (x of arrayCookies){
      if(x.includes('email=')){
          return x.substring('email='.length+1, x.length);
      }
  }
}

function getIDfromCookies(){
  var arrayCookies = document.cookie.split(';');

  for (x of arrayCookies){
      if(x.includes('id=')){
          return x.substring('id='.length+1, x.length);
      }
  }
}