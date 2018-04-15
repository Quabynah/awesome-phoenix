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

    // Get user login state
    var auth = firebase.auth();
    var user = auth.currentUser;
    if (user != null) {
      // User is signed in.
      console.log("User is already logged in");
      window.location = "dashboard.html";
    }else {
      console.log("No user logged in");
    }

    // Add registration authentication
    join.on('click', function(event){
        event.preventDefault();
        showSpinner(spinner);

        //Create new user object
        firebase.auth().createUserWithEmailAndPassword(email.val(), password.val()).then(function(user){
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


      // Facebook login
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('public_profile');
      facebookLogin.on('click', function(){
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

});

//Push user data to database
var pushData = function(user){
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
