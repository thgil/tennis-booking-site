'use strict';

angular.module('tennisBookingSiteApp')
  .factory('Coach', function ($resource) {
    return $resource('/api/users/coach/:url/:controller', {
      id: '@_id'
    },{
      
    },
    {
      stripTrailingSlashes: true
    });
  });
