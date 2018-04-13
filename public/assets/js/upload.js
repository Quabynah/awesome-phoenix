$(document).ready(function() {
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

    u_upload.on('click', (event) => {
        event.preventDefault();

    });

});

window.addEventListener('load', function() {
    var spinner = $("#overlay");

    //Hide spinner
    hideSpinner(spinner);
});

var startDropzone = function() {

};

var hideSpinner = function(spinner) {
    spinner.hide();
};

var showSpinner = function(spinner) {
    spinner.show();
};

// Upload product to database
var uploadProduct = function(name, description, category, url, price, discount, tag, quantity, brand, timestamp, shop) {

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