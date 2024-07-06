let database = firebase.database();
let auth = firebase.auth();
const currentUser = {};

let ifLoggedIn = () => {
    
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(user.uid);
                location = "home.html";
            }
          });
    
    }
    
let ifLoggedOut = () => {
        
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            currentUser.key = user.uid;
            return database.ref('/user/' + currentUser.key).once('value').then(function(snapshot) {
                currentUser.data = snapshot.val();
                // console.log(snapshot.val())
              });
        }
        else{
            location = "index.html";
        }
      });
}
    
let logOut = () => {
        firebase.auth().signOut().then(function() {
            location ="index.html";
        })
        .catch(function(error) {
            // An error happened.
        });
    }


    