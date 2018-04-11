$(document).ready(function() {
    //Get field values
    var password = $("#passwordText").val();
    var email = $("#emailText").val();
    var spinner = $("#overlay");

    $('#loginBtn').on('click', (event) => {
        event.preventDefault();

        // Todo: Add firebase authentication
        // login(email, password);

        //Remove this 
        window.location = "dashboard.html";
    });
});

window.addEventListener('load', function() {
    var spinner = $("#overlay");

    //Hide spinner
    hideSpinner(spinner);
});

//Function to login user
var login = function(email, password) {
    if (email == '' || password == '') {
        window.alert('No email or password entered');
    } else {
        //Sign in user with this logic
        // window.location = "dashboard.html";
        window.alert('Fields are accurately filled');
    }
}

var hideSpinner = function(spinner) {
    spinner.hide();
};

var showSpinner = function(spinner) {
    spinner.show();
};