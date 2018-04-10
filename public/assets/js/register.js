$(document).ready(function() {
    //Get variables
    var username = $('#username').val();
    var email = $('#email').val();
    var shop = $('#shop').val();
    var password = $('#password').val();
    var join = $('#joinButton');

    join.on('click', (event) => {
        event.preventDefault();

        // Todo: Sign up user using firebase
        // signUp(username, email, password, shop);

        //Remove this when firebase auth is implemented
        window.location = "dashboard.html";
    });

});

//Sign up new administrator
var signUp = function(username, email, password, shop) {
    //Check all fields
    if (username == '') {
        console.log('username not entered');
    }
    if (email == '') {
        console.log('email not entered');
    }
    if (password == '') {
        console.log('password not entered');
    }
    if (shop == '') {
        console.log('shop name not entered');
    }

    if (username == '' || email == '' || password == '' || shop == '') {
        demo.showNotification('top', 'right', "Please fill in all fields");
    } else {
        window.location = "dashboard.hmtl";
    }
};