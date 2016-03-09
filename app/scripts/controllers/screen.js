'use strict';


/**
 * @ngdoc function
 * @name ticTacToeApp.controller:ScreenCtrl
 * @description
 * # ScreenCtrl
 * Controller of the ticTacToeApp
 */

var app = angular.module('ticTacToeApp');

app.controller('ScreenCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.choice = 'X';

    $scope.start =  function () {
        $location.path('/game/' + $scope.choice);
    };
}]);
