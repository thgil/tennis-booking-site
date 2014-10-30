'use strict';

angular.module('tennisBookingSiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('signupCoach', {
        url: '/signup/coach',
        templateUrl: 'app/account/signup/coach/coach.html',
        controller: 'SignupCtrl'
      })
      .state('signupUser', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      });
  });