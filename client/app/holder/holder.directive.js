/* global Holder: true */

'use strict';

angular.module('tennisBookingSiteApp')
  .directive('holder', function () {
    return {
        link: function (scope, element, attrs) {
            attrs.$set('data-src', attrs.holder);
            Holder.run({ images: element[0], nocss: true });
        }
    };
  });