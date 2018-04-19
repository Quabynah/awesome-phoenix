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

    // Load all products from database
    loadAllProducts("Imagery");

});

// Get user data from the database reference
var getUser = function(user) {
    var docRef = db.collection(`phoenix/web/staff`).doc(`${user.uid}`);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
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
    const collection = firestore.collection('/phoenix/products/all');
    // Get table body by ID
    var table = $('#t_body');

    //Continue from here
    collection.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());

                //    <tr>
                //         <td>
                //         Dakota Rice
                //     </td>
                //     <td>
                //         Clothing
                //     </td>
                //     <td>
                //         234
                //     </td>
                //     <td class="text-right">
                //         $36,738
                //     </td>
                // </tr>
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
};

//Upload a new product item to the database reference
var uploadProduct = function(name, description, category, price, discount, quantity, brand, animated = false) {
    //Defines database reference for all products
    const allProductsRef = "/phoenix/products/all";
    const ref = `/phoenix/products/${category}`;

    // Get image file
    var image_blob = $('#image').files;

    //Store product image in storage bucket
    firebase.storage().ref(ref).put(image_blob.item(0)).then((result) => {
        //Get the result from the upload task and add downloadUrl to product
    });

};

var hideSpinner = function(spinner) {
    spinner.hide();
};

var showSpinner = function(spinner) {
    spinner.show();
};