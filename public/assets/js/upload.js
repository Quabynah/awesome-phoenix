$(document).ready(function() {
    var spinner = $("#overlay");
    //Add script here


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