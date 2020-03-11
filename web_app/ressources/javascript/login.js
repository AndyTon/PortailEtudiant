
const form = document.getElementById('myForm');
form.addEventListener('submit', function(event) {
    event.preventDefault();
});

function toRegisterPage(){
    window.location.href = "http://localhost:2000/register";
}

function validate_login(){
    window.location.href = "http://localhost:2000/accueil";
}