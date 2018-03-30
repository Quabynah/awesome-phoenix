$(document).ready(function() {
    //Add scripts here
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