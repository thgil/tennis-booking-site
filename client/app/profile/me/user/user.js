'use strict';

angular.module('tennisBookingSiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('userdashboard', {
        url: '/dashboard',
        templateUrl: 'app/profile/me/user/user.html',
        controller: 'EditUserCtrl',
        authenticate: true
      });
  });