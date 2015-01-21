'use strict';

angular.module('tennisBookingSiteApp')
  .factory('Local', function ($resource) {
    return $resource('/auth/local/:controller', {
      id: '@_id'
    },
    {
      verifyMail: {
        method: 'GET',
        params: {
          controller:'mailconfirmation'
        }
      },
      confirmMail: {
        method: 'POST',
        params: {
          controller:'mailconfirmation'
        }
      }
	  });
  });