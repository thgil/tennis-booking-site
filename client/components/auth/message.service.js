'use strict';

angular.module('tennisBookingSiteApp')
.factory('Message', function ($resource) {
  return $resource('/api/message/:controller', {
    id: '@_id'
  },
  {

  });
});
