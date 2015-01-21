'use strict';

angular.module('tennisBookingSiteApp')
  .factory('Search', function ($resource) {
    return $resource('/api/search/:controller', {
      id: '@_id'
    },
    {
      main: {
        method: 'GET',
        isArray:true
      }
    });
  });