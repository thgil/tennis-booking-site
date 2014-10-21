'use strict';

describe('Controller: Coach2Ctrl', function () {

  // load the controller's module
  beforeEach(module('tennisBookingSiteApp'));

  var Coach2Ctrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Coach2Ctrl = $controller('Coach2Ctrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
