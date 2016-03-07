'use strict';

/**
 * @ngdoc function
 * @name ticTacToeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ticTacToeApp
 */

var app = angular.module('ticTacToeApp');

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.turnNumber = 1;
    $scope.currentPlayer = 'X'; // 'O'
    $scope.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
// $scope.board[r][c] = 'X'
    $scope.update = function (index, row) {
        if (row[index] !== null) {
            return;
        }
        if ($scope.turnNumber % 2 != 0) {
            $scope.currentPlayer = 'O'
            row[index] = 'X';
        } else {
            $scope.currentPlayer = 'X';
            row[index] = 'O';
        }
        $scope.turnNumber++;
    };

    $scope.isWin = function() {
        return null;
    };


}]);
