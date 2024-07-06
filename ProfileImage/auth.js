import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore,collection, doc, setDoc,getDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

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
const storage = getStorage(app);

// Your authentication, database, and storage functions here
document.getElementById("signup").addEventListener("click", signup)
async function signup() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const imageFile = document.getElementById('signup-image').files[0];

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth,email, password);
    const userId = userCredential.user.uid;

    // Upload image to Firebase Storage
    const storageRef = ref(getStorage(), `profile_images/${userId}/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);

    // Save user profile data to Firestore
    await setDoc(doc(db, 'users', userId), {
      email: email,
      profileImage: imageUrl
    });

    console.log('User signed up successfully!');
    // Optionally, redirect to a profile page or display a success message
  } catch (error) {
    console.error(error.message);
  }
}

document.getElementById("login").addEventListener("click", login)
async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in successfully!');
    // Optionally, redirect to a dashboard or display user information
  } catch (error) {
    console.error(error.message);
  }
}
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    document.getElementById('user-email').textContent = user.email;

    // Fetch user profile data from Firestore
    // Assuming 'users' is the collection and userId is the document ID
const userId = user.uid;
const userDocRef = doc(db, 'users', userId);

getDoc(userDocRef)
  .then((doc) => {
    if (doc.exists()) {
      const userData = doc.data();
      document.getElementById('user-image').src = userData.profileImage;
    } else {
      console.log('Document does not exist!');
    }
  })
  .catch((error) => {
    console.error('Error getting document:', error);
  });


    // Show user info section
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
  } else {
    // User is signed out
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'block';
  }
});
// Logout function
document.getElementById("logout").addEventListener("click", logout)
function logout() {
  auth.signOut().then(() => {
    console.log('User logged out successfully!');
    // Optionally, redirect to a login page or display a logout message
  }).catch((error) => {
    console.error(error.message);
  });
}

// Other functions (login, logout, auth state change) go here

export { signup, login, logout };
document.getElementById("logID").innerHTML = "Hello: " + localStorage.getItem("id");
