const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDyO2pWA3OonAXIsHrvKKkeWhVHpkI9Bvs",
    authDomain: "phoenix-master.firebaseapp.com",
    databaseURL: "https://phoenix-master.firebaseio.com",
    projectId: "phoenix-master",
    storageBucket: "phoenix-master.appspot.com",
    messagingSenderId: "118933953659"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Add a new document in collection "cities"
db.collection("cities").doc().set({
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    })
    .then(function() {
        console.log("Document successfully written!");
        db.collection("cities").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });