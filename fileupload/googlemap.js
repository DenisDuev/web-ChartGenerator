function myMap() {
    var uluru = {lat: 42.674208, lng: 23.330210};
    var mapProp = {
        center: uluru,
        zoom: 15
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    // Create an array of alphabetical characters used to label the markers.
    var labels = [
        "M",
        "FMI",
        "U",
        "T5"
    ];

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
};

var locations = [

    {lat: 42.671547, lng: 23.3214792},
    {lat: 42.674208, lng: 23.330210},
    {lat: 42.682702,lng: 23.3317496},
    {lat: 42.674846,lng: 23.329755}

];


