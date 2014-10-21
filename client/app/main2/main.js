'use strict';

angular.module('tennisBookingSiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main2', {
        url: '/main2',
        templateUrl: 'app/main2/main.html',
        controller: 'Main2Ctrl'
      });
  });