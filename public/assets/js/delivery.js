$(document).ready(function() {
    var spinner = $("#overlay")
        //Add scripts here
});

window.addEventListener('load', function() {
    var spinner = $("#overlay");

    //Hide spinner
    hideSpinner(spinner);
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

var hideSpinner = function(spinner) {
    spinner.hide();
};

var showSpinner = function(spinner) {
    spinner.show();
};