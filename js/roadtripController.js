app.controller('TripController', function($scope, $http, $window, $firebaseObject) {
    var ref = new Firebase("https://westcoastroadtrip.firebaseio.com/locations");

    var hasStorage = false;
    if (typeof(Storage) !== "undefined") {
        hasStorage = true;
    }

    console.log("init called")
    var map;
    var mapOptions = {
        zoom: 8,
        center: {
            lat: -34.397,
            lng: 150.644
        }
    };
    map = new google.maps.Map(document.getElementById('map'),
        mapOptions);
    console.log(map)

    var marker = new google.maps.Marker({
        // The below line is equivalent to writing:
        // position: new google.maps.LatLng(-34.397, 150.644)
        position: {
            lat: -34.397,
            lng: 150.644
        },
        map: map
    });

    // You can use a LatLng literal in place of a google.maps.LatLng object when
    // creating the Marker object. Once the Marker object is instantiated, its
    // position will be available as a google.maps.LatLng object. In this case,
    // we retrieve the marker's position using the
    // google.maps.LatLng.getPosition() method.
    var infowindow = new google.maps.InfoWindow({
        content: '<p>Marker Location:' + marker.getPosition() + '</p>'
    });
    infowindow.open(map, marker);


    var syncObject = $firebaseObject(ref);
    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
    syncObject.$bindTo($scope, "locations");

    if (hasStorage && localStorage.track) {
        // check for Geolocation support
        if (navigator.geolocation) {
            console.log('Geolocation is supported! finding location...');
            navigator.geolocation.watchPosition(function(position) {
                console.log(position.coords.latitude + ',' + position.coords.longitude);
            });
        } else {
            console.log('Geolocation is not supported for this Browser/OS version yet.');
        }
    }

    $scope.addTracking = function() {
        console.log('logging in...');
        if (hasStorage && !localStorage.track) {
            localStorage.track = true;
        }
        $window.location.href = '../';
    }

    $scope.removeTracking = function() {
        if (hasStorage && localStorage.track) {
            localStorage.removeItem('track');
            $window.location.href = '../';
        }
    }

});