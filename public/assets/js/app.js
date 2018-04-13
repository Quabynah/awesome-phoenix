document.addEventListener('DOMContentLoaded', function() {
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

    console.log(firebase.app());

    firebase.firestore().enablePersistence()
        .then(function() {
            // Initialize Cloud Firestore through firebase
            var db = firebase.firestore();
        })
        .catch(function(err) {
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } else if (err.code == 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        });
});