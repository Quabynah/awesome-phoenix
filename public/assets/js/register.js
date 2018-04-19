$(document).ready(function() {
    //Get variables
    var username = $('#username')
    var email = $('#email');
    var shop = $('#shop');
    var password = $('#password');
    var join = $('#joinButton');
    var googleLogin = $('#googleLogin');
    var facebookLogin = $('#facebookLogin');
    var spinner = $("#overlay");

    // Hide spinner
    hideSpinner(spinner);

    // Observer for user login state
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
            console.log(user);
        } else {
            // User is signed out.
            console.log("User is logged out");

        }
    });

    // Add registration authentication
    join.on('click', function(event) {
        event.preventDefault();
        // Show loading dialog
        showSpinner(spinner);

        // Check shop name from user's registration form input
        var db = firebase.firestore();
        db.collection("phoenix/web/shops").get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    //Create new user object
                    firebase.auth().createUserWithEmailAndPassword(email.val(), password.val()).then(function(user) {
                        console.log(user.email);
                        pushData(user);
                    }).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorMessage);
                        hideSpinner(spinner);
                    });

                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

    });

    // Add google login
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    //Do google login
    googleLogin.on('click', function() {
        showSpinner(spinner);
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            pushDataProvider(user);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorMessage);
            hideSpinner(spinner);
        });
    });


    // Facebook login
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    facebookLogin.on('click', function() {
        showSpinner(spinner);
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            pushDataProvider(user);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorMessage);
            hideSpinner(spinner);
        });
    });

});



//Push user data to database
var pushData = function(user) {
    // Upload user data to database
    var db = firebase.firestore();
    var date = new Date();
    var shop = $('#shop');
    var username = $('#username');
    var docData = {
        email: user.email,
        id: date.getMilliseconds(),
        name: username.val(),
        photoUrl: user.photoURL,
        shop: shop.val(),
        timestamp: date,
        uid: user.uid
    };
    db.collection("phoenix/web/staff").doc(`${user.uid}`).set(docData).then(function() {
        console.log("Staff created successfully with email ", user.email);
        hideSpinner($('#overlay'));
        window.location = "dashboard.html";
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        hideSpinner($('#overlay'));
    });
};

//Push user data to database
var pushDataProvider = function(user) {
    // Upload user data to database
    var db = firebase.firestore();
    var date = new Date();
    var shop = $('#shop');
    var docData = {
        email: user.email,
        id: date.getMilliseconds(),
        name: user.displayName,
        photoUrl: user.photoURL,
        shop: shop.val(),
        timestamp: date,
        uid: user.uid
    };
    db.collection("phoenix/web/staff").doc(`${user.uid}`).set(docData).then(function() {
        console.log("Staff created successfully with email ", user.email);
        hideSpinner($('#overlay'));
        window.location = "dashboard.html";
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        hideSpinner($('#overlay'));
    });
};

var hideSpinner = function(spinner) {
    spinner.hide();
};

var showSpinner = function(spinner) {
    spinner.show();
};