'use strict';

angular.module('tennisBookingSiteApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, uiGmapGoogleMapApi, $window, Flash) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to profile and send flash message
          Flash.setMessage('Confirmation email sent! You can fill out your profile at anytime.');
          $location.path('/profile');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
    
    $scope.registerCoach = function(form) {
      $scope.submitted = true;
      $scope.loc = [];

      if(form.$valid) {
        
        uiGmapGoogleMapApi.then(function(maps) {
          var geocoder = new maps.Geocoder();
          
          geocoder.geocode( { 'address': $scope.user.location }, function(results, status) {
            if (status === maps.GeocoderStatus.OK) {
              console.log(results[0].geometry.location);
        
              $scope.loc = [results[0].geometry.location.lat(),results[0].geometry.location.lng()];
              console.log($scope.loc);
        
              Auth.createCoach({
                name: $scope.user.name,
                email: $scope.user.email,
                password: $scope.user.password,
                location: $scope.user.location,
                loc: $scope.loc,
                phone: $scope.user.phone
              })
              .then( function() {
                // Account created, redirect to profile
                Flash.setMessage('Confirmation email sent! Next fill out your information.');
                $location.path('/profile');
              })
              .catch( function(err) {
                err = err.data;
                $scope.errors = {};

                // Update validity of form fields that match the mongoose errors
                angular.forEach(err.errors, function(error, field) {
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.message;
                });
              });
            } else {
              // $scope.errors = {'geo':'Google maps didnt repsond in time!'};              
              // form['location'].$setValidity('location', false);
            }
          });
        });
      }
    };

  });
