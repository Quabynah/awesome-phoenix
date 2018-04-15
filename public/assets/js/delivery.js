$(document).ready(function() {
    var spinner = $("#overlay");
        //Add scripts here
    hideSpinner(spinner);

    // Get user login state
    var auth = firebase.auth();
    auth.onAuthStateChanged(function(user) {
      if (!user) {
        // User is signed in.
        console.log("User is already logged in");
        window.location = "login.html";
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
