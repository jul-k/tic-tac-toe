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
    $scope.currentPlayer = 'X';
    $scope.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

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

        function verifyArray(array) {
            var vals = _.uniq(array);
            if (vals.length != 1) {
                return false;
            }
            return vals[0] != null;
        }
        // row
        var ok = _.map($scope.board, verifyArray); // -> [bool]

        if (_.any(ok)){
            return true;
        }

        // column
        var ok = _.map(_.unzip($scope.board), verifyArray);
        if (_.any(ok)){
            return true;
        }

        // forward diagonal

        var diagonal = [];
        for (var i = 0; i < $scope.board.length; i++) {
            for (var j = 0; j < $scope.board[i].length; j++) {
                if (i == j) {
                 diagonal.push($scope.board[i][j]);
                }
            }
        }
        if (verifyArray(diagonal)){
            return true;
        }

        // backward diagonal

        var diagonal = [];
        for (var i = 0; i < $scope.board.length; i++) {
            for (var j = 0; j < $scope.board[i].length; j++) {
                if ((i + j) === $scope.board[i].length - 1) {
                 diagonal.push($scope.board[i][j]);
                }
            }
        }
        if (verifyArray(diagonal)){
            return true;
        }
        return false;
    };


}]);
