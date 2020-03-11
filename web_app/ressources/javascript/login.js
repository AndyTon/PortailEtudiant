
const form = document.getElementById('myForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
});

function toRegisterPage() {
    window.location.href = "http://localhost:2000/register";
}

function validate_login() {
    var user = document.getElementById('email').value;
    var pw = document.getElementById('password').value;

    fetch('http://localhost:3000/user/login', {
        method: 'GET',
        headers: {
            'user': user,
            'pw': pw
        }
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });


    // window.location.href = "http://localhost:2000/accueil";
}