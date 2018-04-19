$(document).ready(function() {
    var spinner = $("#overlay");
    //Add scripts here
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
            // ...
            console.log("User is logged out");

        }
    });

});

//Signs out any currently logged in staff
function signOut() {
    //Add firebase aign out function here
    firebase.auth().signOut().then(() => {
        //Apply login for sign out
    }).catch((error) => {
        console.log("Oops! It's like you are unable to logout of this session", error);
    });
};

var hideSpinner = function(spinner) {
    spinner.hide();
};

var showSpinner = function(spinner) {
    spinner.show();
};