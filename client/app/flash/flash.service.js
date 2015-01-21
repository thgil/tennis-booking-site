'use strict';

angular.module('tennisBookingSiteApp')
  .factory('Flash', function($rootScope) {
    var queue = [];
    var currentMessage = '';

    $rootScope.$on('$locationChangeSuccess', function() {
      currentMessage = queue.shift() || '';
    });

    return {
      setMessage: function(message) {
        queue.push(message);
      },
      getMessage: function() {
        return currentMessage;
      }
    };
});