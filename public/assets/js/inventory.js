$(document).ready(function() {
    var search = $('#inv_search').val();
    var search_btn = $("#search_btn");
    var u_upload = $('#u_upload');

    var spinner = $("#overlay");

    //Hide spinner
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

    // Upload product to database
    u_upload.on('click', function(){
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
        searchFor(search);
    });

});

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

    //Continue from here
};

//Upload a new product item to the database reference
var uploadProduct = function(name, description, category, price, discount, quantity, brand, animated = false) {
    //Defines database reference for all products
    const allProductsRef = "/phoenix/products/all";
    const productsRef = `/phoenix/products/${category}`;
    const storageRef = `/phoenix/products/${category}`;

    //Obtain image blob
    const image_blob = getImageBlob(u_image);

    //Store product image in storage bucket
    firebase.storage().ref(storageRef).put(image_blob).then((result) => {
        //Get the result from the upload task and add downloadUrl to product
    });

};

//Converts data obtained in file to blob
var getImageBlob = async function(input) {
    //

    //Returns blob
    return new Promise();
};

var hideSpinner = function(spinner) {
    spinner.hide();
};

var showSpinner = function(spinner) {
    spinner.show();
};
