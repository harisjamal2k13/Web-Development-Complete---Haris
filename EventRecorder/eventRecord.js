import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, updateDoc, collection, doc, addDoc, deleteDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

    // TODO: Add SDKs for Firebase products that you want to use
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);


const eventForm = document.getElementById('eventForm');
const eventList = document.getElementById('eventList');

// Function to render events from Firestore
function renderEvents() {
    const querySnapshot = collection(db, "events");

 getDocs(collection(db, "events")).then((querySnapshot) => {
        eventList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const eventData = doc.data();
            const li = document.createElement('li');
            li.textContent = `${eventData.name} - ${eventData.date}`;
            eventList.appendChild(li);
        });
    });
}

// Event listener for form submission
eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const eventName = eventForm['eventName'].value;
    const eventDate = eventForm['eventDate'].value;

    // Add event to Firestore
    addDoc(collection(db, "events"), {
        name: eventName,
        date: eventDate
      })
    // db.collection('events').add({
    //     name: eventName,
    //     date: eventDate
    // })
    .then(() => {
        // Clear form fields after adding event
        eventForm.reset();
        // Render updated event list
        renderEvents();
    }).catch((error) => {
        console.error("Error adding event: ", error);
    });
});

// Initial rendering of events
renderEvents();
document.getElementById("logID").innerHTML = "Hello: " + localStorage.getItem("id");
