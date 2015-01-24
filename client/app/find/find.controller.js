'use strict';

angular.module('tennisBookingSiteApp')
  .controller('FindCtrl', function ($scope, User) {
    
    $scope.slider = {};    
    
    User.getFeatured(function(coaches){
      $scope.featuredCoaches = coaches;
    });
  });
