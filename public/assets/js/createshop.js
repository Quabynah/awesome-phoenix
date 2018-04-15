$(document).ready(function(){


  // Get user login state
  var auth = firebase.auth();
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("User is already logged in");
      window.location = "login.html";
    }
  });

});
