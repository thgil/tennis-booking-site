'use strict';

angular.module('tennisBookingSiteApp')
  .controller('ListCtrl', function ($scope, User) {
        
    User.getFeatured(function(coaches){
      $scope.featuredCoaches = coaches;
    });
  });
