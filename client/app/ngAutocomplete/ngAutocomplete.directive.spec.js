'use strict';

describe('Directive: ngAutocomplete', function () {

  // load the directive's module
  beforeEach(module('tennisBookingSiteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // it('should fail without ngModel', inject(function ($compile) {
  //   element = angular.element('<div ng-autocomplete></div>');
  //   element = $compile(element)(scope);
  //   expect(element.text()).toBe('this is the ngAutocomplete directive');
  // }));
});