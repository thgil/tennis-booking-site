'use strict';

angular.module('tennisBookingSiteApp')
.controller('ReviewCtrl', function ($scope, Auth, $location, $stateParams) {
  $scope.review = {};
  $scope.errors = {};
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.reviewToken = $stateParams.reviewToken;
  $scope.invalidToken = false;
  
  if (!$scope.reviewToken) {
    $location.path('/');
  }
  
  $scope.reviewLesson = function(form) {
    if(form.$valid) {
      Auth.submitReview($scope.reviewToken, $scope.review)
      .then( function() {
        // Logged in, redirect to home
        $location.path('/');
      })
      .catch( function(err) {
        
        err = err.data;
        $scope.errors = {};
        
        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.message;
        });
        
        $scope.errors.other = err.message;
      });
    }
  };
});