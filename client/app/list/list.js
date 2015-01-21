'use strict';

angular.module('tennisBookingSiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('list', {
        url: '/list',
        templateUrl: 'app/list/list.html',
        controller: 'ListCtrl'
      });
  });