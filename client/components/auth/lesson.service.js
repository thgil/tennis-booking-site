'use strict';

angular.module('tennisBookingSiteApp')
  .factory('Lesson', function ($resource) {
    return $resource('/api/lessons/:id/:controller', {
      id: '@_id'
    });
  });
