import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, updateDoc, collection, doc, addDoc, deleteDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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
// Initialize Firebase
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');    
const todoList = document.getElementById('todo-list');

let todos = [];

// Function to render todos
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');

// css li bootstrap start
var listItems = document.querySelectorAll('#todo-list li');
// Loop through each <li> element and add the class "list-group-item"
listItems.forEach(function(item) {
    item.classList.add('list-group-item');
    // item.classList.add('list-group-item');
});
// css li bootstrap finish

        li.innerHTML = `
            <span>${todo.title}</span>
            <button class="delete-btn btn btn-danger" data-id="${todo.id}">Delete</button>
            <button class="edit-btn btn btn-success" data-id="${todo.id}">Edit</button>
        `;
        todoList.appendChild(li);
    });
    addDeleteListeners();
    addEditListeners();
}

// Function to fetch todos from Firestore
async function fetchTodos() {
    todos = [];
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        todos.push(
            { 
            id: doc.id,
            ...doc.data() 
        });
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

    renderTodos();
}

// Function to add todo to Firestore
async function addTodo() {
    const title = todoInput.value.trim();
    if (title !== '') {
       await addDoc(collection(db, "todos"), {
        title: title
          });
          console.log("Document written with ID: ");
        // await db.collection('todos').add({
        //     title: title
        // });
        todoInput.value = '';
        fetchTodos();
    }
}

// Function to delete todo from Firestore
async function deleteTodoById(id) {
    await deleteDoc(doc(db, "todos", id))   ;
    fetchTodos();
}

// Function to update todo in Firestore
async function updateTodoById(id, newTitle) {
    await updateDoc(doc(db, "todos", id), {
        title: newTitle
      });
    // await db.collection('todos').doc(id).update({
    //     title: newTitle
    // });
    fetchTodos();
}

// Function to add event listeners for delete buttons
function addDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const todoId = button.getAttribute('data-id');
            deleteTodoById(todoId);
        });
    });
}

// Function to add event listeners for edit buttons
function addEditListeners() {
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const todoId = button.getAttribute('data-id');
            const newTitle = prompt('Enter new title:', todos.find(todo => todo.id === todoId).title);
            if (newTitle && newTitle.trim() !== '') {
                updateTodoById(todoId, newTitle.trim());
            }
        });
    });
}

// Event listener for todo form submission
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo();
});
// Initial fetch of todos
fetchTodos();

// Delete All
const deleteAllButton = document.getElementById('delete-all-btn');
deleteAllButton.addEventListener('click', deleteAllTodos);

async function deleteAllTodos() {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });
    // After deleting all todos, fetch and render an empty list
    todos = [];
    renderTodos();
}
document.getElementById("logID").innerHTML = "Hello: " + localStorage.getItem("id");

