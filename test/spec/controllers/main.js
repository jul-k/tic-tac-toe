'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('ticTacToeApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should win when row is filled', function () {
     scope.board = [
          [null, null, null],
          ['X', 'X', 'X'],
          [null, null, null]
      ];
    expect(scope.isWin()).toBe(true);
  });

  it('should win when column is filled', function () {
     scope.board = [
          [null, null, 'O'],
          ['X', 'X', 'O'],
          [null, null, 'O']
      ];
    expect(scope.isWin()).toBe(true);
  });

  it('should win when forward diagonal is filled', function () {
     scope.board = [
          ['X', null, null],
          [null, 'X', null],
          [null, null, 'X']
      ];
    expect(scope.isWin()).toBe(true);
  });

  it('should win when backward diagonal is filled', function () {
     scope.board = [
          [null, null, 'O'],
          [null, 'O', null],
          ['O', null, null]
      ];
    expect(scope.isWin()).toBe(true);
  });

  it('should not win when one row filled inconsistently', function () {
     scope.board = [
          ['X', 'O', 'X'],
          [null, null, null],
          [null, null, null]
      ];
    expect(scope.isWin()).toBe(false);
  });

  it('should not win when nobody wins', function () {
     scope.board = [
          ['X', 'O', 'X'],
          ['X', 'O', 'O'],
          ['O', 'X', "X"]
      ];
    expect(scope.isWin()).toBe(false);
  });


});
