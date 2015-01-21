'use strict';

angular.module('tennisBookingSiteApp')
  .controller('AdminCtrl', function ($scope, $http, $stateParams, Auth, User) {

    $scope.userId = $stateParams.userId;
  
    // Use the User $resource to fetch all users
    $scope.users = User.query(function() {
      if($scope.userId) {
        angular.forEach($scope.users, function(u) {
          if (u._id === $scope.userId) {
            u.active = true;
          }
        });
      }
    });
  
    $scope.delete = function(user) {
      console.log(user);
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
    
    $scope.matchRole = function(role1, role2) {
      return function(user) { return user.role.match(role1)||user.role.match(role2);};
    };
    
    $scope.confirm = function(user) {
      user.confirmedCoach = !user.confirmedCoach;
      User.confirmCoach({ id: user._id }, user);
    };
  });
