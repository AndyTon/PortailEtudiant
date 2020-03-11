
const form = document.getElementById('myForm');
form.addEventListener('submit', function(event) {
    event.preventDefault();
});

function toRegisterPage(){
    console.log("works");
    window.location.href = "http://localhost:1000/register";
}

function validate_login(){
    window.location.href = "http://localhost:1000/accueil";
}