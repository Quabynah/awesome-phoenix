$(document).ready(function() {
    var search = $('#inv_search');
    var search_btn = $("#search_btn");
    var u_upload = $('#u_upload');

    var spinner = $("#overlay");

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
            getCurrentUser(uid);
        } else {
            // User is signed out.
            window.location.href = "login.html";

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
    var row = $('#products_row');

    //Continue from here
    collection.onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges.forEach(function(change) {
            if (change.type === "added") {
                var doc = change.doc;
                // doc.data() is never undefined for query doc snapshots
                var data = doc.data();

                // For debugging
                console.log(doc.id, " => ", data);
                //Hide spinner
                hideSpinner($('#overlay'));

                // Append data to rows
                row.append(
                    `  <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-stats">
                        <div class="card-header" style="height: auto;">
                            <img src="${data.url}" alt="Loading">
                        </div>
                        <div class="card-content ">
                            <h3 class="title text-center">
                                <small>${data.name}</small>
                            </h3>
                            <h3 class="category text-center">
                                GHC ${data.price} (${data.discount}% off)
                            </h3>
                            <h4 class="category text-center">
                                ${data.description}
                            </h4>
                            <h4 class="category text-center">
                                ${data.category}
                            </h4>
                        </div>
                        <hr>
                        <div class="card-footer text-center">
                            <a onclick="showModalFor(${data})" class="btn btn-round btn-lg btn-block text-white" style="background: rgba(57, 92, 247, 0.7)">Update</a>
                        </div>
                    </div>
                </div>`
                );
            }
        });
    }, function(error) {
        console.log(error.message);
        alert(error.message);

    });
};

// Modal for product details
var modalData = function() {
    // Get fields
    var img = $('#details_image');
    var price = $('#details_price');
    var description = $('#details_description');
    var timestamp = $('#details_timestamp');
    var upload = $('#details_upload');
    var name = $('#details_name');
};

// var docData = {
//     id: date.getMilliseconds(),
//     name: u_name.val(),
//     description: u_desc.val(),
//     category: u_cat.val(),
//     url: content,
//     price: u_price.val(),
//     discount: u_discount.val(),
//     tag: u_brand.val(),
//     brand: [u_brand.val()],
//     quantity: u_qty.val(),
//     animated: false,
//     shop: u_shop.val(),
//     logo: null,
//     shopID: null,
//     timestamp: date,
//     hasFadedIn: false,
//     parsedDescription: null,
//     key: pdtDoc.id
// };

// Show modal to allow user to edit product details
var showModalFor = function(data) {
    console.log(data);

};

var signOut = function() {
    //Add firebase aign out function here
    firebase.auth().signOut().then(() => {

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