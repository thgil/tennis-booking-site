'use strict';

angular.module('tennisBookingSiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('coach2', {
        url: '/profile/coach2',
        templateUrl: 'app/profile/coach2/coach2.html',
        controller: 'Coach2Ctrl'
      });
  });