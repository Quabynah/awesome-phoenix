// Globa;l variable for storing content of product image
var content = null;

$(document).ready(function() {
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
            window.location = "login.html";

        }
    });

    u_upload.on('click', (event) => {
        event.preventDefault();
        //Show spinner
        showSpinner(spinner);
        uploadProduct();
    });
});

var hideSpinner = function(spinner) {
    spinner.hide();
};

var showSpinner = function(spinner) {
    spinner.show();
};

// Obtain logged in user's data from the database
var getCurrentUser = function(uid) {
    // Get document reference
    var userDoc = firebase.firestore().collection('phoenix/web/staff').doc(uid);

    // Get user data
    userDoc.get().then(function(doc) {
        // For debugging
        console.log("user data is: ", doc.data());

        // Set shop for user
        $('#u_shop').val(doc.data().shop);

    }).catch(function(err) {
        console.log(err.message);
        alert(err.message);
    });
};

//Upload file to storage reference
var uploadFile = function(files) {
    if (files.length === 0) {
        console.log("No files selected");
        content = null;
        return content;
    } else {
        // Get file
        var currentFile = files.item(0);

        // Create file metadata including the content type
        var metadata = {
            contentType: currentFile.type,
        };

        // Log file name and metadata to console for debugging
        console.log(currentFile.name, " => ", metadata);

        // Create storage reference
        var ref = firebase.storage().ref('phoenix/products').child(`${currentFile.name}`);

        // Upload file and get task
        var task = ref.put(currentFile, metadata);

        // Get progress text
        var uploadProgress = $('#progress');

        // Monitor task for progress
        task.on('state_changed',
            // Shows progress of task
            function progress(snapshot) {
                showSpinner($('#overlay'));
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + percentage + '% done');
                uploadProgress.text(`Image upload progress: ${percentage.toFixed(2)} %`);
            },
            // Shows any errors occurring during progress
            function error(err) {
                // Handle unsuccessful uploads
                console.log(err);
                hideSpinner($('#overlay'));
                alert(err.message);
            },
            // Shows when task is completed
            function complete() {
                console.log("Upload successful");
                // Handle successful uploads on complete
                content = task.snapshot.downloadURL;
                console.log(content);
                hideSpinner($('#overlay'));
                return content;
            });
    }
};

// Upload product to database
var uploadProduct = function() {
    //Get variables from update product modal
    var u_name = $('#u_name');
    var u_qty = $('#u_qty');
    var u_shop = $('#u_shop');
    var u_brand = $('#u_brand');
    var u_desc = $('#u_desc');
    var u_cat = $('#u_cat');
    var u_price = $('#u_price');
    var u_discount = $('#u_discount');
    var u_image = $('#u_image');

    // Init firestore
    const db = firebase.firestore();

    //Create collection for all products
    var allCat = db.collection('phoenix/products/all');

    // Create category reference for each product
    var catRef = db.collection(`phoenix/products/${u_cat.val()}`);
    var pdtDoc = catRef.doc();

    // Get current date
    var date = new Date();

    // Setup product data
    var docData = {
        id: date.getTime(),
        name: u_name.val(),
        description: u_desc.val(),
        category: u_cat.val(),
        url: content,
        price: u_price.val(),
        discount: u_discount.val(),
        tag: u_brand.val(),
        brand: [u_brand.val()],
        quantity: u_qty.val(),
        animated: false,
        shop: u_shop.val(),
        logo: null,
        shopID: null,
        timestamp: date,
        hasFadedIn: false,
        parsedDescription: null,
        key: pdtDoc.id
    };

    pdtDoc.set(docData).then(function() {
        // The document has successfully been created
        // The admin will be notified on the creation of the new shop with the details
        allCat.doc(`${pdtDoc.id}`).set(docData).then(function() {
            console.log("Document successfully updated!");
            hideSpinner($('#overlay'));
            alert(`${u_name.val()} added successfully`);

            // Reset fields
            resetFields();
        });
    }).catch(function(error) {
        //Outputs the error message to the console
        console.error("Error adding document: ", error);
        hideSpinner($('#overlay'));
    });

};

var resetFields = function() {
    //Get variables from update product modal
    $('#u_name').val('');
    $('#u_qty').val('');
    $('#u_brand').val('');
    $('#u_desc').val('');
    $('#u_cat').val('');
    $('#u_price').val('');
    $('#u_discount').val('');
    $('#inputFile').val('');
    $('#progress').val('Image upload progress: 0%');
};

//Products references
// const val FAVORITE_REF = "favorites"
// const val BUSINESS_REF = "business"
// const val STUDENT_REF = "students"
// const val KIDS_REF = "kids"
// const val CLOTHING_REF = "clothing"
// const val ENTERTAINMENT_REF = "entertainment"
// const val HEALTH_REF = "health"
// const val BEVERAGE_REF = "beverage"