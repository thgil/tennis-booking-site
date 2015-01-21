'use strict';

angular.module('tennisBookingSiteApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      changeProfile: {
        method: 'PUT',
        params: {
          controller:'profile'
        }
      },
      changeAbout: {
        method: 'PUT',
        params: {
          controller:'about'
        }
      },
      changeAvailability: {
        method: 'PUT',
        params: {
          controller:'availability'
        }
      },
      getFeatured: {
        method: 'GET',
        params: {
          controller:'getFeatured'
        },
        isArray:true
      },
      search: {
        method: 'GET',
        params: {
          controller:'search'
        },
        isArray:true
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      createUser: {
        method: 'POST'
      },
      confirmCoach: { 
        method: 'PUT',
        params: {
          controller:'confirmCoach'
        }
      }
	  });
  });