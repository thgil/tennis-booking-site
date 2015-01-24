'use strict';

angular.module('tennisBookingSiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('loginWithToken', {
        url: '/login/:sessionToken',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('confirm', {
        url: '/confirm',
        templateUrl: 'app/account/confirm/confirm.html',
        controller: 'ConfirmCtrl',
        authenticate: true
      })
      .state('confirmWithCode', {
        url: '/confirm/:confirmToken',
        templateUrl: 'app/account/confirm/confirm.html',
        controller: 'ConfirmCtrl'
      })
      .state('coachConfirm', {
        url: '/coachconfirm',
        templateUrl: 'app/account/coachConfirm/confirm.html',
        controller: 'CoachConfirmCtrl',
        authenticate: true
      })
      .state('coachConfirmWithCode', {
        url: '/coachconfirm/:confirmToken',
        templateUrl: 'app/account/coachConfirm/confirm.html',
        controller: 'CoachConfirmCtrl'
      });
  });