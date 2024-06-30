import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// Initialize Firebase
// import {firebaseConfig} from '/config.js';
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

// signout function firebase
const signoutBtn = document.getElementById('logout');
signoutBtn.addEventListener('click', () => {
  const auth = getAuth(app);
  signOut(auth)
    .then(() => {
      console.log('User signed out successfully');
      alert("User signed out successfully");
      location.href = "index.html";
    })
    .catch((error) => {
      alert('Error signing out: ', error);
    });
});

document.getElementById("logID").innerHTML = localStorage.getItem("id");