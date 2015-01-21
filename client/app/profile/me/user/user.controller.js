/*jshint curly: false */

'use strict';

angular.module('tennisBookingSiteApp')
  .controller('EditUserCtrl', function ( $scope, $modal, $log, Auth, User, Coach, Lesson) {
    $scope.errors = {};
    $scope.completed = 0;
    
    $scope.lessons = Lesson.query();
    
    $scope.user = User.get(function(user){
      $scope.complete(user);
    });
              
    $scope.changeProfile = function(form) {
      $scope.submitted = true;
      
      if(form.$valid) {
        Auth.changeProfile( $scope.user )
        .then( function() {
          $scope.complete($scope.user);
          $scope.message = 'Profile successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Something went wrong!';
          $scope.message = '';
        });
      }
    };          
    
    $scope.complete = function(user) {
      $scope.completed = 0;
      if(user.exp) $scope.completed += 20;
      if(user.for) $scope.completed += 20;
      if(user.count) $scope.completed += 20;
      if(user.age) $scope.completed += 20;
      if(user.confirmed) $scope.completed += 20;
    };
    
  });