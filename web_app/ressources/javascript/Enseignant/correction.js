function onPageLoad() {
  populateCorrection();
}

function getIDfromCookies(){
  var arrayCookies = document.cookie.split(';');

  for (x of arrayCookies){
      if(x.includes('id=')){
          return x.substring('id='.length+1, x.length);
      }
  }
}

function populateCorrection() {
  let url = "http://localhost:4000/exercice/getSolutionStudent"
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id_exercice = urlParams.get("idE");
  let id_etudiant = urlParams.get("IdS");
  let id_prof = getIDfromCookies();

  fetch(url, {
    method:"GET",
    headers:{
      id_exercice: id_exercice,
      id_etudiant: id_etudiant,
      id_prof: id_prof
    }
  })
  .then((response) => {
    if(response.ok){
      return response.json();
    }
  }).then((result) => {
    //to do
    resultToHTML();
  })
}

function resultToHTML(){
  var enonce = document.getElementById('enonce');

  var studentInfo = document.getElementById('studentInfo');

  var questionSection = document.getElementById('questionSection');
}

function soumettre(){
  var note = document.getElementById('note').value;
  let url = "http://localhost:4000/exercice/getSolutionStudent"

  fetch(url, {
    method: "POST",
    headers:{
      idprof:idprof,
      ideleve: ideleve,
      idExercice: idExercice
    },
  }).then((response)=>{
    if(response.ok){
      window.location.href = "http://localhost:2000/CorrigerExercice";
    }
  })
}

function toAccueil() {
  window.location.href = "http://localhost:2000/accueilProf";
}

function back() {
  window.location.href = "http://localhost:2000/CorrigerExercice";
}
