'use strict';

angular.module('tennisBookingSiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('find', {
        url: '/find',
        templateUrl: 'app/find/find.html',
        controller: 'FindCtrl'
      });
  });