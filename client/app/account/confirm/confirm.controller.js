'use strict';

angular.module('tennisBookingSiteApp')
  .controller('ConfirmCtrl', function ($scope, Auth, $location, $stateParams) {
    $scope.errors = {};
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.confirmToken = $stateParams.confirmToken;
    var confirmationMailSend = false;
    $scope.invalidToken = false;
  
    if ($scope.confirmToken) {
      Auth.confirmEmail($scope.confirmToken)
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function() {
          $scope.invalidToken = true;
        });
    }


    $scope.sendConfirmationMail = function() {
      Auth.sendConfirmationMail();
    };

    $scope.confirmationMailSend = function() {
      return confirmationMailSend;
    };


  });