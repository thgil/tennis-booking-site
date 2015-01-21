'use strict';

angular.module('tennisBookingSiteApp')
  .controller('CoachConfirmCtrl', function ($scope, Auth, $location, $stateParams) {
    $scope.errors = {};
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.confirmToken = $stateParams.confirmToken;
    var confirmationMailSend = false;
    $scope.invalidToken = false;

    console.log($stateParams);
  
    if ($scope.confirmToken) {
      Auth.createCoach($scope.confirmToken)
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function() {
          $scope.invalidToken = true;
        });
    }


    $scope.sendConfirmationMail = function() {
      Auth.sendCoachConfirmationMail();
    };

    $scope.confirmationMailSend = function() {
      return confirmationMailSend;
    };


  });