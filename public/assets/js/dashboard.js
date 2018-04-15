$(document).ready(function() {
    var spinner = $("#overlay");
    var logout = $("#signout");

    // Hide Spinner
    hideSpinner(spinner);

    // Get user login state
    var auth = firebase.auth();
    var user = auth.currentUser;
    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    } else {
      console.log("User is not logged in");
    }



    // Logout user action
    logout.on('click', function(){
      signOut();
    });
});


//Signs out any currently logged in staff
function signOut(spinner) {
    //Add firebase aign out function here
    firebase.auth().signOut().then(() => {
        //Apply login for sign out
        window.location = "login.html";
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
