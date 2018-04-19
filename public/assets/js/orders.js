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
            getCurrentUser(uid);
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

// Obtain logged in user's data from the database
var getCurrentUser = function(uid) {
    // Get document reference
    var userDoc = firebase.firestore().collection('phoenix/web/staff').doc(uid);

    // Get user data
    userDoc.get().then(function(doc) {
        // For debugging
        console.log("user data is: ", doc.data());

        // Load shop orders
        loadAllOrders(doc.data().shop);

    }).catch(function(err) {
        console.log(err.message);
        alert(err.message);
    });
};

//Loads all data from the database where shop name is current shop's name
var loadAllOrders = function(shopName) {
    //get firestore instance
    const firestore = firebase.firestore();
    //get products collections
    const collection = firestore.collection(`/phoenix/orders/{id}`).where("shop", "==", shopName);
    // Get table body by ID
    var table = $('#t_body');

    //Continue from here
    collection.onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges.forEach(function(change) {
            if (change.type === "added") {
                var doc = change.doc;
                // doc.data() is never undefined for query doc snapshots
                var data = doc.data();

                // For debugging
                console.log(doc.id, " => ", data);

                // Append data to table
                table.append("<tr><td>" + data.name + "</td><td>" + data.timestamp + "</td><td>" + data.quantity + "</td><td>" + data.price + "</td></tr>");
            }
        });
    }, function(error) {
        console.log(error.message);
        alert(error.message);

    });
};


var hideSpinner = function(spinner) {
    spinner.hide();
};

var showSpinner = function(spinner) {
    spinner.show();
};