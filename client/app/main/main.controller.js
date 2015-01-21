'use strict';

angular.module('tennisBookingSiteApp')
  .controller('MainCtrl', function ($scope, $http, User, Search, uiGmapGoogleMapApi, $location ) {
        
    $scope.showCoaches = false;
    $scope.noCoaches = false;
    
    $scope.location = [];
    $scope.loc = [];
    $scope.radius = 10/3000;
    
    $scope.featuredCoaches = [];
     
    User.getFeatured(function(coaches){
      $scope.featuredCoaches = coaches;
    });
    
    $scope.sports = ['Ultimate','Snowboarding','Squash','Dance','Figure Skating','Skiing','Wrestling','Strength & Conditioning','Golf','Tennis','Fitness','Diving','Basketball','Soccer','Martial Arts',
      'Baseball','Football','Ice Hockey','Field Hockey','Volleyball','Softball','Boxing','Triathlon','Running','Track & Field','Lacrosse','Rugby','Swimming','Yoga','Kickboxing','Gymnastics','Cheerleading'];

    $scope.find = function(form) { 
      if(form.$valid) {
        $scope.loading=true;
        uiGmapGoogleMapApi.then(function(maps) {
          var geocoder = new maps.Geocoder();
          
          geocoder.geocode( { 'address': $scope.location }, function(results, status) {
            if (status === maps.GeocoderStatus.OK) {
              $scope.loc = [results[0].geometry.location.lat(),results[0].geometry.location.lng()];
        
              Search.main({loc: $scope.loc,  radius: $scope.radius}, function(coaches){
                $location.path( '/list' );
                
                $scope.loading=false;
                $scope.featuredCoaches = coaches;
                if($scope.featuredCoaches.length > 0) {
                  $scope.showCoaches = true;
                  $scope.noCoaches = false;
                } else {
                  $scope.showCoaches = false;
                  $scope.noCoaches = true;
                }
              });
            }
          });
        });
      }
    };
     
    $scope.backwards = function() {
      var l = $scope.selectedCoaches.length;
      $scope.selectedCoaches.pop();
      $scope.selectedCoaches.unshift( (($scope.selectedCoaches[0]-1)%l+l)%l );
    };
    
    $scope.forward = function() {
      var l = $scope.selectedCoaches.length;
      $scope.selectedCoaches.push( (($scope.selectedCoaches[l-1]+1)%l+l)%l );
      $scope.selectedCoaches.shift();
    };
    
    $scope.change = function(x) {
      // var l = $scope.selectedCoaches.length;
      
      if(x===-1) {
        $scope.backwards();
      }
      if(x===-2) {
        $scope.backwards();
        $scope.backwards();
      }
      if(x===1) {
        $scope.forward();
      }
      if(x===2) {
        $scope.forward();
        $scope.forward();
      }
    };
  });
