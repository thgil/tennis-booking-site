'use strict';

angular.module('tennisBookingSiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('coachprofile', {
        url: '/editprofile',
        templateUrl: 'app/profile/me/coach/coach.html',
        controller: 'EditCoachCtrl',
        authenticate: true
      });
  });