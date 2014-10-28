'use strict';

angular.module('tennisBookingSiteApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.url();

        // check to see if the path has a trailing slash
        if ('/' === path[path.length - 1]) {
            return path.replace(/\/$/, '');
        }

        if (path.indexOf('/?') > 0) {
            return path.replace('/?', '?');
        }

        return false;
    });
    $stateProvider
      .state('coach1', {
        url: '/profile/:coachId',
        templateUrl: 'app/profile/coach1/coach1.html',
        controller: 'Coach1Ctrl'
      });
  });