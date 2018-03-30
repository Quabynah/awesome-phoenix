$(document).ready(function() {
    //Variables from HTML
    var logoutButton = $("#logoutButton");
    var shop = $("#staffShop").val();
    var email = $("#staffEmail").val();
    var firstName = $("#staffFirstName").val();
    var surname = $("#staffSurname").val();
    var address = $("#staffAddress").val();
    var profileName = $("#staffProfileName").val();
    var picture = $("#staffPicture");
    var backgroundPicture = $("#shopBgPic");

    //todo: add code here

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