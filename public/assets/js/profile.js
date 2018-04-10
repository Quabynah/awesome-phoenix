$(document).ready(function() {
    //Variables for Col #1
    var logoutButton = $("#logout");
    var sm_shop = $("#sm_shop").val();
    var sm_email = $("#sm_email").val();
    var sm_first = $("#sm_first").val();
    var sm_last = $("#sm_last").val();
    var sm_address = $("#sm_address").val();
    var s_bg_picture = $("#s_bg_picture");

    //Variables for Col #2
    var picture = $("#s_picture");
    var s_shop = $("#s_shop").val();
    var s_email = $("#s_email").val();
    var username = $("#s_username").val();


    picture.on('click', (event) => {
        event.preventDefault();
        alert("HGgell");
    })

});

//Signs out any currently logged in staff
var logout = function() {
    //Add firebase aign out function here
    firebase.auth().signOut().then(() => {
        //navigate user back to the landing page
        window.location = "index.html";
    }).catch((error) => {
        console.log("Oops! It's like you are unable to logout of this session", error);
    });
};