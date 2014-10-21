'use strict';

angular.module('tennisBookingSiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('coach1', {
        url: '/profile/coach1',
        templateUrl: 'app/profile/coach1/coach1.html',
        controller: 'Coach1Ctrl'
      });
  });