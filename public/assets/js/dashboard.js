$(document).ready(function() {
    var spinner = $("#overlay");
    var logout = $("#signout");
    var username = $('#username');

    // Hide Spinner
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
            getCurrentUser(uid);
        } else {
            // User is signed out.
            window.location = "login.html";

        }
    });



    // Logout user action
    logout.on('click', function() {
        signOut();
    });
});


//Signs out any currently logged in staff
var signOut = function() {
    //Add firebase aign out function here
    firebase.auth().signOut().then(() => {

    }).catch((error) => {
        console.log("Oops! It's like you are unable to logout of this session", error);
    });
};

// Obtain logged in user's data from the database
var getCurrentUser = function(uid) {
    // Get document reference
    var userDoc = firebase.firestore().collection('phoenix/web/staff').doc(uid);

    // Get user data
    userDoc.get().then(function(doc) {
        // For debugging
        console.log("user data is: ", doc.data());

        // Set username for user
        $('#username').text(doc.data().name);

    }).catch(function(err) {
        console.log(err.message);
        alert(err.message);
    });
};

var hideSpinner = function(spinner) {
    spinner.hide();
};

var showSpinner = function(spinner) {
    spinner.show();
};