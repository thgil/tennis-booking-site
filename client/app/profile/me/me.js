'use strict';

angular.module('tennisBookingSiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('me', {
        url: '/profile',
        templateUrl: 'app/profile/me/me.html',
        controller: 'MeCtrl',
        authenticate: true
      });
  });