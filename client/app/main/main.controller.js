'use strict';

angular.module('tennisBookingSiteApp')
  .controller('MainCtrl', function ($scope, $http, socket, User, uiGmapGoogleMapApi, $window) {
    
    
    /*
    * GoogleMapApi is a promise with a
    * then callback of the google.maps object
    *   @pram: maps = google.maps
    */
    
    $scope.map = {
      center: {
        latitude: 44.41748017333282,
        longitude: 26.106005249023376
      },
      zoom: 12,
      options: {
        disableDefaultUI: true,
        panControl: true,
        zoomControl: true,
        scaleControl: true,
        streetViewControl: false,
        overviewMapControl: false,
      },
      infoWindowWithCustomClass: {
        options: {
          disableAutoPan: false,
          boxClass: 'custom-info-window',
          alignBottom: true
        },
      }
    };

  $scope.map.bounds = {};
  $scope.map.randomMarkers = [];
  
  uiGmapGoogleMapApi.then(function(maps) {
    
    var geocoder = new maps.Geocoder();
    
    geocoder.geocode( { 'address': '4 oaktree lawn, castleknock'}, function(results, status) {
      if (status == maps.GeocoderStatus.OK) {
        console.log(results[0].geometry.location);
        $scope.map.center = {latitude: results[0].geometry.location.lat(),longitude: results[0].geometry.location.lng()};
        // var marker = new maps.Marker({
        //     map: $scope.map,
        //     position: results[0].geometry.location
        // });
      }
    });

  $window.navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

        // var infowindow = new google.maps.InfoWindow({
        //   map: map,
        //   position: pos,
        //   content: 'Location found using HTML5.'
        // });
        // console.log(maps);
        // $scope.map.center = {latitude:position.coords.latitude,longitude:position.coords.longitude};
    });
  });
    
  
  
  
    
    $scope.rangeSize = [1,2,3,2,1];
    $scope.rangeChange = [-2,-1,0,1,2];
    $scope.size = 30;
    
    $scope.selectedCoaches = [0,1,2,3,4];
    $scope.featuredCoaches = ['coach1','coach2','coach3','coach4','coach5','coach6','coach7'];
     
    User.getFeatured(function(coaches){
      $scope.featuredCoaches = coaches;
    });
     
    $scope.backwards = function() {
      var l = $scope.selectedCoaches.length;
      $scope.selectedCoaches.pop();
      $scope.selectedCoaches.unshift( (($scope.selectedCoaches[0]-1)%l+l)%l );
    } 
    
    $scope.forward = function() {
      var l = $scope.selectedCoaches.length;
      $scope.selectedCoaches.push( (($scope.selectedCoaches[l-1]+1)%l+l)%l );
      $scope.selectedCoaches.shift();
    } 
    
    $scope.change = function(x) {
      var l = $scope.selectedCoaches.length;
      
      if(x==-1) {
        $scope.backwards();
      }
      if(x==-2) {
        $scope.backwards();
        $scope.backwards();
      }
      if(x==1) {
        $scope.forward()
      }
      if(x==2) {
        $scope.forward()
        $scope.forward()
      }
    };
    
    // $scope.range = function(min, max, step){
    //   step = step || 1;
    //   var input = [];
    //   for (var i = min; i <= max; i += step) input.push($scope.featuredCoaches[i]);
    //   return input;
    // };
    
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
