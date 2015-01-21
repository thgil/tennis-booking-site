'use strict';

angular.module('tennisBookingSiteApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('review', {
    url: '/review',
    templateUrl: 'app/review/review.html',
    controller: 'ReviewCtrl',
  })
  .state('reviewWithCode', {
    url: '/review/:reviewToken',
    templateUrl: 'app/review/review.html',
    controller: 'ReviewCtrl'
  });
});