'use strict';

angular.module('tennisBookingSiteApp')
.factory('Review', function ($resource) {
  return $resource('/api/reviews/:id/:controller', {
    id: '@_id'
  },
  {
    submitReview: {
      method: 'POST',
      params: {
        controller:'submitreview'
      }
    }
  });
});
