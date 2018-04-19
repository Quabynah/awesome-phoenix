$(document).ready(function() {
    var search = $('#inv_search');
    var search_btn = $("#search_btn");
    var u_upload = $('#u_upload');

    var spinner = $("#overlay");

    //Hide spinner
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

    // Upload product to database
    u_upload.on('click', function() {
        event.preventDefault();
        console.log("Checking fields....");

        //Check all fields
        if (u_name != '' && u_qty != '' && u_cat != '' && u_desc != '' && u_brand != '') {
            console.log("Fields are: ", [u_brand, u_name, u_qty, u_desc, u_cat]);

            //Upload product
            uploadProduct(u_name, u_desc, u_cat, u_price, u_discount, u_qty, u_brand);
        }

    });

    //Search product
    search_btn.on('click', (event) => {
        event.preventDefault();

        //Search for content
        searchFor(search.val());
    });

});

// Obtain logged in user's data from the database
var getCurrentUser = function(uid) {
    // Get document reference
    var userDoc = firebase.firestore().collection('phoenix/web/staff').doc(uid);

    // Get user data
    userDoc.get().then(function(doc) {
        // For debugging
        console.log("user data is: ", doc.data());

        // Load shop data
        loadAllProducts(doc.data().shop);

    }).catch(function(err) {
        console.log(err.message);
        alert(err.message);
    });
};

var searchFor = function(content) {
    //Search for content
    if (content != '') {
        console.log("Searching for: ", content);
    } else {
        console.log("No data entered");
    }
};

//Loads all data from the database where shop name is current shop's name
var loadAllProducts = function(shopName) {
    //get firestore instance
    const firestore = firebase.firestore();
    //get products collections
    const collection = firestore.collection('/phoenix/products/all').where("shop", "==", shopName);
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
                table.append("<tr><td>" + data.name + "</td><td>" + data.brand[0] + "</td><td>" + data.quantity + "</td><td>" + data.price + "</td></tr>");
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