function onPageLoad() {
  populateCorrection();
}

function getIDfromCookies() {
  var arrayCookies = document.cookie.split(";");

  for (x of arrayCookies) {
    if (x.includes("id=")) {
      return x.substring("id=".length + 1, x.length);
    }
  }
}

function populateCorrection() {
  let url = "http://localhost:4000/exercice/getSolutionStudent";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id_exercice = urlParams.get("idE");
  let id_etudiant = urlParams.get("IdS");
  let id_prof = getIDfromCookies();

  fetch(url, {
    method: "GET",
    headers: {
      id_exercice: id_exercice,
      id_etudiant: id_etudiant,
      id_prof: id_prof,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((result) => {
      resultToHTML(result[0].questions, 
        result[0].solutionE,
        result[0].enonce_exercice.slice(0,result[0].enonce_exercice.indexOf(">")),
        result[0].enonce_exercice.slice(result[0].enonce_exercice.indexOf(">")+1,result[0].enonce_exercice.length)
      );
    });
}

function resultToHTML(questions, sol, titre, enon) {
  document.getElementById('titre').innerHTML = titre;
  document.getElementById("enonce").innerHTML = enon;

  questions.split(',').map((question) => {
    let arr = question.split(':');
    let text = arr[0];
    if(arr[1] === "DIV"){
      addRadioArea(text, arr[2]);
    } else {
      addTextArea(text);
    }
    answerCounter++;
  })

  let divCounter = 0;
  sol.split(':').map((sol) => {
    if(sol.split('-').length > 1){
      let arr = sol.split('-');
      
      var options = document.getElementById(`answer${divCounter}`);
    
      options.children[arr[1]].children[0].checked = true;
    } else {
      document.getElementById(`answer${divCounter}`).innerText = sol;
    }
    divCounter++;
  })
  
}

var answerCounter = 0;
var counter=0;

function addRadioArea(text, options){
  let questionSection = document.getElementById('questionSection');

  var { div, questionNode } = setQuestionArea(text);

  var generalDiv = document.createElement('div');
  generalDiv.setAttribute('id', `answer${answerCounter}`)
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
      radioObject.setAttribute("disabled", "true");
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

function addTextArea(text){
  var questionSection = document.getElementById("questionSection");

  var { div, questionNode } = setQuestionArea(text);

  var textArea = document.createElement("DIV");
    textArea.setAttribute('class', 'answer');
    textArea.setAttribute('id', `answer${answerCounter}`)

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

function soumettre() {
  var note = document.getElementById("note").value;
  let idprof = getIDfromCookies();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let idExercice = urlParams.get("idE");
  let ideleve = urlParams.get("IdS");

  let url = "http://localhost:4000/exercice/saveProfessorCorrection";

  fetch(url, {
    method: "POST",
    headers: {
      idprof: idprof,
      ideleve: ideleve,
      idExercice: idExercice,
      note: note
    },
  }).then((response) => {
    if (response.ok) {
      window.location.href = "http://localhost:2000/CorrigerExercice";
    }
  });
}

function toAccueil() {
  window.location.href = "http://localhost:2000/accueilProf";
}

function back() {
  window.location.href = "http://localhost:2000/CorrigerExercice";
}
