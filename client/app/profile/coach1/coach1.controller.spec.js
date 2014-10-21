'use strict';

describe('Controller: Coach1Ctrl', function () {

  // load the controller's module
  beforeEach(module('tennisBookingSiteApp'));

  var Coach1Ctrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Coach1Ctrl = $controller('Coach1Ctrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
