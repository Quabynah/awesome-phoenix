$(document).ready(function() {
    //Get field values
    var password = $("#passwordText").val();
    var email = $("#emailText").val();

    //Do login action for button
    $("#loginBtn").click(login(email, password));

});

//Function to login user
function login(email, password) {
    if (email == " " || password == " ") {
        window.alert('No email or password entered');
    } else {
        //Sign in user with this logic
        window.location = "dashboard.html";
        // window.alert('Fields are accurately filled');
    }
}