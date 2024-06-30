import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, updateDoc, collection, doc, addDoc, deleteDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref,uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const db = getFirestore(app);
const firebaseApp = getApp();
const storage = getStorage(firebaseApp);

// Function to upload image to Firebase Storage
document.getElementById("uploadImage").addEventListener("click", uploadImage)
function uploadImage() {
    const file = document.querySelector('#imageInput').files[0];
    const storageRef = ref(storage, file.name);
    // const storageRef = firebase.storage().ref();
    const imagesRef = ref(storage, 'images/file.name');

    // const imagesRef = storageRef.child('images/' + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Image uploaded successfully');
        displayImage(file);
    }).catch(error => {
        console.error('Error uploading image: ', error);
    });      
}

// Function to display uploaded image
function displayImage(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const imgElement = document.getElementById('uploadedImage');
        imgElement.src = event.target.result;
    };
    reader.readAsDataURL(file);
}
document.getElementById("logID").innerHTML = "Hello: " + localStorage.getItem("id");
