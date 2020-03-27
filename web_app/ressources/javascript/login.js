
const form = document.getElementById('myForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
});

function toRegisterPage() {
    window.location.href = "http://localhost:2000/register";
}

const red = "#F44336";

function validate_login() {
    var userElement = document.getElementById('email');
    var user = userElement.value;

    var pwElement = document.getElementById('password')
    var pw = pwElement.value;

    fetch('http://localhost:3000/user/login', {
        method: 'GET',
        headers: {
            'user': user,
            'pw': pw
        }
    })
        .then((response) => {
            if(!response.ok){
                userElement.nextElementSibling.innerHTML = "Invalid Username or Password";
                userElement.nextElementSibling.style.color = red;

                pwElement.nextElementSibling.innerHTML = "Invalid Username or Password";
                pwElement.nextElementSibling.style.color = red;
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((result) =>{
            document.cookie = "lastName="+result.lastName;
            document.cookie = "firstName="+result.firstName;
            document.cookie = "email="+result.email;
            document.cookie = "role="+result.role;
            window.location.href = "http://localhost:2000/accueil";
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}