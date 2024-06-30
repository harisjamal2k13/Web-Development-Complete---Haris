import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,signOut , onAuthStateChanged  }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCxdnyyN6s8gzISIhmEU9LpXLzeXh1cjHM",
    authDomain: "fb-june2024.firebaseapp.com",
    databaseURL: "https://fb-june2024-default-rtdb.firebaseio.com",
    projectId: "fb-june2024",
    storageBucket: "fb-june2024.appspot.com",
    messagingSenderId: "160080813553",
    appId: "1:160080813553:web:f7557c64b1e35a78267850",
    measurementId: "G-8KXWKMW1CT"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore();

// Access Firebase Auth and Firestore services
// const auth = firebase.auth();
// const firestore = firebase.firestore();
// Login Form
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['loginEmail'].value;
    const password = loginForm['loginPassword'].value;

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('User logged in:', cred.user);
            alert("Login Successfully");
            window.location.href = ("home.html");
            // Redirect or perform other actions after login
          })
        .catch(error => {
            console.error('Login error:', error.message);
            alert("Login ID or Password Wrong");
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
        });
});

// Signup Form
const signupForm = document.querySelector('#signupForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['signupEmail'].value;
    const password = signupForm['signupPassword'].value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('User signed up:', cred.user);
            // Add user data to Firestore
            // return db.collection('users').doc(cred.user.uid).set({
            //     email: email
            //     // You can add more fields here as needed
            // });
            const db = getFirestore();
            return addDoc(collection(db, "users"), {
                email: email,
                pass: password
            });
        })
        .then(() => {
            console.log('User data added to Firestore');
            alert("Signup Successfully, Now login above");
            document.getElementById("signupEmail").value = "";
            document.getElementById("signupPassword").value = "";
            // window.location.href = ("home.html");
            // Redirect or perform other actions after signup
        })
        .catch(error => {
            console.error('Signup error:', error.message);
            alert("SignUp ID or Password Wrong");
            document.getElementById("loginEmail").value = "";
            document.getElementById("loginPassword").value = "";
        });

});

// forget Password firebase auth
let fgPass = document.getElementById("fp");
fgPass.addEventListener('click', function () {
    let email = document.getElementById("loginEmail");

    const auth = getAuth();
    sendPasswordResetEmail(auth, email.value)
    .then(() => {
            alert("A Password reset Link has been sent to your email");
        })
        .catch((error) => {
            alert(error.message)
            console.log(error.code);
            console.log(error.message);
        })
    });
    // const auth = getAuth();
//     const user = auth.currentUser;
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;
//     // ...
// } else {
//     // User is signed out
//     alert("User logged out");
//     // ...
// }
// });

    // local storage
document.getElementById("loginBtn").addEventListener("click", loginID);

function loginID()
{
  var LogID = document.getElementById("loginEmail").value;
  localStorage.setItem("id", LogID);
  return false;
}