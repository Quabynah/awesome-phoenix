// Global variable for storing shop image content
var content = null;

$(document).ready(function() {
    // get document elements
    var spinner = $('#overlay');
    var create = $('#createShop');
    var imageFile = $('#inputFile');

    // hide spinner once document is completely loaded
    hideSpinner(spinner);

    // Add action to create new shop
    create.on('click', function(ev) {
        ev.preventDefault();
        showSpinner(spinner);
        register();
    });

});

// Upload file to storage reference
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
        var ref = firebase.storage().ref('phoenix/web/shops').child(`${currentFile.name}`);

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
                uploadProgress.text(`Upload progress: ${percentage.toFixed(2)} %`);
            },
            // Shows any errors occurring during progress
            function error(err) {
                // Handle unsuccessful uploads
                console.log(err);
                hideSpinner($('#overlay'));
                alert(err.errorMessage);
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

// Register new shop with the details provided
var register = function() {
    // Get Fields
    var name = $('#shopName');
    var motto = $('#shopMotto');

    // Get current date
    var date = new Date();

    // Set data for new document
    var docData = {
        followers_count: 0,
        id: date.getMilliseconds(),
        key: `${date.getMilliseconds()}`,
        logo: content,
        motto: motto.val(),
        name: name.val(),
        products_count: 0,
        timestamp: date
    };

    // Get database reference
    var db = firebase.firestore().collection("phoenix/web/shops");

    // This will create a new document in the 'shops' database reference with a new id
    var curDoc = db.doc();
    curDoc.set(docData).then(function() {
        // The document has successfully been created
        // The admin will be notified on the creation of the new shop with the details
        db.doc(`${curDoc.id}`).update({ key: curDoc.id }).then(function() {
            console.log("Document successfully updated!");
            hideSpinner($('#overlay'));
            alert(`${name.val()} added successfully`);

            // Reset fields
            name.val('');
            motto.val('');
            $('#inputFile').val('');
        });
    }).catch(function(error) {
        //Outputs the error message to the console
        console.error("Error adding document: ", error);
        hideSpinner($('#overlay'));
    });

};

// Hide loading dialog
var hideSpinner = function(spinner) {
    spinner.hide();
};

// Show loading dialog
var showSpinner = function(spinner) {
    spinner.show();
};