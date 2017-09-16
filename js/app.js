var map;

// Create a new blank array for all the listing markers.
var markers = [];

var Place = function(data) {
  this.title = ko.observable(data.title);
  this.location = ko.observable(data.location);
};

function AppViewModel() {
  var self = this;
  this.query = ko.observable('');
  //creates observable array
  this.placeList = ko.observableArray([]);
  //pushes each location into obervable array
  locations.forEach(function(place){
    self.placeList.push(new Place(place));
  });

//animates the selected marker
  this.clickPlace = function(place){
    //console.log(place.marker.title);
    google.maps.event.trigger(place.marker, 'click');
  };


  this.filteredItems = ko.computed(function() {
    var filter = self.query().toLowerCase();
    //console.log(filter);
     if (!filter) {
       //console.log(self.placeList());
        return self.placeList();
    } else {
        return ko.utils.arrayFilter(self.placeList(), function(place) {
            return stringStartsWith(place.title.toLowerCase, filter);
        });


    }
}, self);







  // filtering of the locations (focus on the list view items first before synchronizing with the markers)
  // http://knockoutjs.com/documentation/computedObservables.html
  // https://opensoul.org/2011/06/23/live-search-with-knockoutjs/
  // http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf

}



// Initialises the map
function initMap() {

    // Constructor creates a new map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -40.900557,
            lng: 174.885971
        },
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
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
      });
    }
  }

//loops through markers array and stops animations
  stopAnimation = function(){
    for (var i = 0; i < markers.length; i++) {
      markers[i].setAnimation(null);
    }
  };
//replacement for stringStartsWith which was removed from KO. credit: https://stackoverflow.com/questions/28042344/filter-using-knockoutjs
  var stringStartsWith = function (string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
};


  // Activates knockout.js

var appViewModel = new AppViewModel();

ko.applyBindings(appViewModel);
