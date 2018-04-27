$(document).ready(function() {
    var spinner = $("#overlay");
    //Add scripts here
    hideSpinner(spinner);

    // Observer for user login state
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            getLocation();
        } else {
            // User is signed out.
            window.location = "login.html";
        }
    });

});

//Signs out any currently logged in staff
var signOut = function() {
    //Add firebase aign out function here
    firebase.auth().signOut().then(() => {

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


// get user's current location
var getLocation = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }
};

// Show user's location on map
var geoSuccess = function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    plotPosition(lat, lng);
};

// Show error to user
var geoError = function() {
    alert("Geocoder failed.");
};

// Plot user's location on the map
var plotPosition = function(newLat, newLng) {
    // Create user position as JSON
    var position = {
        lat: newLat,
        lng: newLng
    }

    // Get map
    var map = getMap(position);

    // Add marker
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });

    var latlng = new google.maps.LatLng(newLat, newLng);
    // Init geocoder
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results)
            if (results[1]) {
                //formatted address
                var address = results[0].formatted_address;
                setLocationText(address);
            } else {
                setLocationText("No results found");
            }
        } else {
            setLocationText("Geocoder failed due to: " + status);
        }
    });

    // Click handler for marker
    var clickHandler = new ClickEventHandler(map, position);
};

var setLocationText = function(message) {
    var response = $('#response');
    response.text(message);
};

/**
 * @constructor
 */
var ClickEventHandler = function(map, origin) {
    this.origin = origin;
    this.map = map;
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);
    this.placesService = new google.maps.places.PlacesService(map);
    this.infowindow = new google.maps.InfoWindow;
    this.infowindowContent = document.getElementById('infowindow-content');
    this.infowindow.setContent(this.infowindowContent);

    // Listen for clicks on the map.
    this.map.addListener('click', this.handleClick.bind(this));
};

ClickEventHandler.prototype.handleClick = function(event) {
    console.log('You clicked on: ' + event.latLng);
    // If the event has a placeId, use it.
    if (event.placeId) {
        console.log('You clicked on place:' + event.placeId);

        // Calling e.stop() on the event prevents the default info window from
        // showing.
        // If you call stop here when there is no placeId you will prevent some
        // other map click event handlers from receiving the event.
        event.stop();
        this.calculateAndDisplayRoute(event.placeId);
        this.getPlaceInformation(event.placeId);
    }
};

ClickEventHandler.prototype.calculateAndDisplayRoute = function(placeId) {
    var me = this;
    this.directionsService.route({
        origin: this.origin,
        destination: { placeId: placeId },
        travelMode: 'WALKING'
    }, function(response, status) {
        if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
};

ClickEventHandler.prototype.getPlaceInformation = function(placeId) {
    var me = this;
    this.placesService.getDetails({ placeId: placeId }, function(place, status) {
        if (status === 'OK') {
            me.infowindow.close();
            me.infowindow.setPosition(place.geometry.location);
            me.infowindowContent.children['place-icon'].src = place.icon;
            me.infowindowContent.children['place-name'].textContent = place.name;
            me.infowindowContent.children['place-id'].textContent = place.place_id;
            me.infowindowContent.children['place-address'].textContent =
                place.formatted_address;
            me.infowindow.open(me.map);
        }
    });
};