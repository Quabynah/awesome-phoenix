$(document).ready(function() {
    //Get field values
    var password = $("#passwordText").val();
    var email = $("#emailText").val();

    $('#loginBtn').on('click', (event) => {
        event.preventDefault();

        // Todo: Add firebase authentication
        // login(email, password);

        //Remove this 
        window.location = "dashboard.html";
    });
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