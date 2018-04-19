// Global vriable for user's profile image
var profileURL = null;

$(document).ready(function() {
    //Variables for Col #1
    var logoutButton = $("#logout");
    var sm_shop = $("#sm_shop");
    var sm_email = $("#sm_email");
    var sm_full = $("#sm_full");
    var sm_address = $("#sm_address");
    var s_bg_picture = $("#s_bg_picture");

    var spinner = $("#overlay");

    // Hide loading progress
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

            sm_email.val(email);
            sm_full.val(displayName);

            // Get current user's data from the database
            getCurrentUser(uid);
        } else {
            // User is signed out.
            // ...
            console.log("User is logged out");

        }
    });

});

//Signs out any currently logged in staff
var logout = function() {
    //Add firebase aign out function here
    firebase.auth().signOut().then(() => {
        //navigate user back to the landing page
        window.location = "index.html";
    }).catch((error) => {
        console.log("Oops! It's like you are unable to logout of this session", error);
    });
};

// Obtain logged in user's data from the database
var getCurrentUser = function(uid) {
    //Variables for Col #2
    var picture = $("#s_picture");
    var s_shop = $("#s_shop");
    var s_email = $("#s_email");
    var username = $("#s_username");

    // Get document reference
    var userDoc = firebase.firestore().collection('phoenix/web/staff').doc(uid);

    // Get user data
    userDoc.get().then(function(doc) {
        // For debugging
        console.log("user data is: ", doc.data());

        // Set username for user
        username.text(doc.data().name);
        s_email.text(doc.data().email);
        s_shop.text(doc.data().shop);
        $("#sm_shop").val(doc.data().shop);
        $("#sm_full").val(doc.data().name);
        $("#sm_address").val(doc.data().location);

        // Add click action for updating user data
        $('#update').on('click', function(ev) {
            ev.preventDefault();
            updateUser(uid);
        });

    }).catch(function(err) {
        console.log(err.message);
        alert(err.message);
    });
};

var updateUser = function(uid) {
    showSpinner($('#overlay'));

    // Get all fields
    var sm_shop = $("#sm_shop");
    var sm_email = $("#sm_email");
    var sm_full = $("#sm_full");
    var sm_address = $("#sm_address");

    // User data to be uploaded
    var docData = {
        email: sm_email.val(),
        name: sm_full.val(),
        photoUrl: profileURL,
        location: sm_address.val()
    };

    // Get document reference
    var userDoc = firebase.firestore().collection('phoenix/web/staff').doc(uid);
    userDoc.update(docData).then(function() {
        console.log("Document successfully updated!");
        getCurrentUser(uid);
        hideSpinner($('#overlay'));
    }).catch(function(err) {
        hideSpinner($('#overlay'));
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