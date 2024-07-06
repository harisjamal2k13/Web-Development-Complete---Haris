//Login check

ifLoggedIn();

// For Login

let userLoginEmail = document.getElementById("userLoginEmail");
let userLoginPassword = document.getElementById("userLoginPassword");

let login = () => {
    var email = userLoginEmail.value;
    var password = userLoginPassword.value;


    auth.signInWithEmailAndPassword(email, password)
        .then(function(user){
            window.localStorage.setItem("UID",user.uid);
            // location = 'home.html';
        })
        .catch(function(error){
            alert(error.message);
        })
}

// To Signup
let signupName = document.getElementById("signupName");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");

let signUp = () => {
    let name = signupName.value;
    let email = signupEmail.value;
    let password = signupPassword.value;


    auth.createUserWithEmailAndPassword(email, password)
        .then(function (user) {
            database.ref().child("user").child(user.uid).set({
                name: name, 
                email: email,
            });
            window.localStorage.setItem("UID",user.uid);
            location = 'home.html';
        })
        .catch(function (error) {
            alert(error.message);
        })

}

document.getElementById("logID").innerHTML = "Hello: " + localStorage.getItem("id");
