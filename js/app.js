var map;

// Create a new blank array for all the listing markers.
var markers = [];

var Place = function(data) {
    this.title = data.title;
    this.location = data.location;
};

function AppViewModel() {
    var self = this;
    this.query = ko.observable('');
    //creates observable array
    this.placeList = ko.observableArray([]);
    //pushes each location into obervable array
    locations.forEach(function(place) {
        self.placeList.push(new Place(place));
    });

    //animates the selected marker
    this.clickPlace = function(place) {
        //console.log(place.marker.title);
        google.maps.event.trigger(place.marker, 'click');
    };

    //filters the locations and markers using the input from the searchbar
    this.filteredItems = ko.computed(function() {
        var filter = self.query().toLowerCase();
        /*console.log(filter);
         //if (!filter) {
           //console.log(self.placeList());
          //  return self.placeList();
        //} else { */
        return ko.utils.arrayFilter(self.placeList(), function(place) {
            var match = place.title.toLowerCase().indexOf(filter) !== -1;
            if (place.marker) {
                place.marker.setVisible(match);
            }
            return match;
        });


        //  }
    }, self);



}



// Initialises the map
function initMap() {

    // Constructor creates a new map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -40.900557,
            lng: 174.885971
        },
        //controls the styles and controls for the map
        zoom: 5,
        styles: styles,
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: false,
        overviewMapControl: true,
        rotateControl: true
    });



    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);

        //adds marker information to the placeList array
        appViewModel.placeList()[i].marker = marker;

        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
            stopAnimation();
            this.setAnimation(google.maps.Animation.BOUNCE);
            //setTimeout(function(){this.marker.setAnimation(null); }, 1400);
        });



        bounds.extend(markers[i].position);
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        //New York Times API request
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + marker.title + "&sort=newest&api-key=16cfed740ab04b5aa04a888e07ff7144";
        //console.log(url);

        //error handling for New York Times API request
        $.ajaxSetup({
            "error": function() {
                infowindow.setContent('News article could not be loaded');
            }
        });
        //API request for New York Times
        $.getJSON(url, function(data) {
            //populates the infowindow with API response
            articles = data.response.docs;
            for (var i = 0; i < articles.length; i++) {
                var article = articles[i];
                infowindow.setContent('<h3>Latest from the New York Times about ' + marker.title + ':</h3>' + '<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
            }


        });
        /*.error(function(e) {
            infowindow.setContent('News article could not be loaded');
        }); */


        infowindow.marker = marker;
        //infowindow.setContent('<div>' + marker.title + '</div>');

        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.setMarker = null;
        });
    }
}

//loops through markers array and stops animations
stopAnimation = function() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setAnimation(null);
    }
};

/*
//replacement for stringStartsWith which was removed from KO. credit: https://stackoverflow.com/questions/28042344/filter-using-knockoutjs
  var stringStartsWith = function (string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
};
*/

// Activates knockout.js
var appViewModel = new AppViewModel();

ko.applyBindings(appViewModel);
