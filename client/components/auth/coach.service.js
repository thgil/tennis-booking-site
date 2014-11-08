'use strict';

angular.module('tennisBookingSiteApp')
  .factory('Coach', function ($resource) {
    return $resource('/api/users/coach/:url/:controller', {
      url: '@_id'
    },{
      get: {
        method: 'GET',
        params: {
          url:'me'
        }
      }
    });
  });
