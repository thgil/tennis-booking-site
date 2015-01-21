'use strict';

angular.module('tennisBookingSiteApp')
  .factory('Coach', function ($resource) {
    return $resource('/api/coaches/:url/:controller', {
      url: '@_id'
    },{
      get: {
        method: 'GET',
        params: {
          url:'me'
        }
      },
      createCoach: {
        method: 'POST',
      }
    });
  });
