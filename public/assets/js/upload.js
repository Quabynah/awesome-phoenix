document.addEventListener('DOMContentLoaded', event => {
    //Get variables from update product modal
    var u_name = $('#u_name').val();
    var u_qty = $('#u_qty').val();
    var u_shop = $('#u_shop').val();
    var u_brand = $('#u_brand').val();
    var u_desc = $('#u_desc').val();
    var u_cat = $('#u_cat').val();
    var u_price = $('#u_price').val();
    var u_discount = $('#u_discount').val();
    var u_image = $('#u_image');
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

    u_upload.on('click', (event) => {
        event.preventDefault();
        //Show spinner
        showSpinner(spinner);
    });

});

var uploadFiles = function(files) {
    //Log each file obtained to the console for now
    const file = files.item(0);
    console.log(file);
};

var hideSpinner = function(spinner) {
    spinner.hide();
};

var showSpinner = function(spinner) {
    spinner.show();
};

// Upload product to database
var uploadProduct = function(name, description, category, url, price, discount, tag, quantity, brand, timestamp, shop) {
    // Init firestore
    const db = firebase.firestore();

    //Create collection for product
    if (category != '') {
        const docID = db.collection(`phoenix/all/${category}`).doc();
    }
};

// override var id: Long = 0

// override var name: String? = null

// var description: String? = null

// var category: String? = null

// override var url: String? = null

// var price: String? = null

// var discount: String? = null

// var tag: String? = null

// var quantity: String? = null

// var brand: List<String>? = null

// var animated = false

// var shop: String? = null

// var logo: String? = null

// var key: String? = null

// var shopID: String? = null

// @ServerTimestamp
// var timestamp: Date? = null

// var hasFadedIn = false
// var parsedDescription: Spanned? = null