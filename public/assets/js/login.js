$(document).ready(function(){
  //Get field values
  var password = $("#passwordText");
  var email = $("#emailText");
  var spinner = $("#overlay");
  var googleLogin = $('#googleLogin');
  var loginBtn = $("#loginBtn");

  // Hide spinner
  hideSpinner(spinner);

  // Get user login state
  var auth = firebase.auth();
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("User is already logged in");
      window.location = "dashboard.html";
    }
  });

  // Add action for login button
  loginBtn.on('click', function(){
    showSpinner(spinner);
    login(email.val(),password.val());
  });

  // Add google login
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  //Do google login
  googleLogin.on('click', function(){
    showSpinner(spinner);
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        pushData(user);
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

    // Persist user login state
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(email.val(), password.val());
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });


});

// Login staff with email and password
var login = function(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      $("#overlay").hide();
      console.error(errorMessage);
    }).then(function(){
      $("#overlay").hide();
      window.location = "dashboard.html";
    });
};

var hideSpinner = function(spinner) {
    spinner.hide();
};

var showSpinner = function(spinner) {
    spinner.show();
};
