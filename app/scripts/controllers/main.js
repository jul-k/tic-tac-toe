'use strict';


function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min)) + min;
 }


/**
 * @ngdoc function
 * @name ticTacToeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ticTacToeApp
 */

var app = angular.module('ticTacToeApp');

app.controller('MainCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {

    $scope.init = function() {
        $scope.turnNumber = 1;
        $scope.currentPlayer = $routeParams.player;
        $scope.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }

    $scope.init();

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

    $scope.update = function (index, row) {
        if (row[index] !== null) {
            return;
        }
        row[index] = 'X';
        $scope.turnNumber++;
        if ($scope.isWin()){
            notie.alert(1, 'Player ' + $scope.currentPlayer + ' won', 3);
            $scope.init();
            return;
        }
        $scope.currentPlayer = 'O';

        $scope.aiTurn();
        $scope.turnNumber++;
        if ($scope.isWin()){
            notie.alert(1, 'Player ' + $scope.currentPlayer + ' won', 3);
            $scope.init();
            return;
        }
        $scope.currentPlayer = 'X';
    };

    $scope.getAllPossibleLines = function(board) {
        var lines = [];
        _.each(board, function (el) {
            lines.push(el);
        });
        _.each(_.unzip(board), function (el) {
            lines.push(el);
        });

        var diagonal = [];
        for (var i = 0; i < $scope.board.length; i++) {
            for (var j = 0; j < $scope.board[i].length; j++) {
                if (i == j) {
                 diagonal.push($scope.board[i][j]);
                }
            }
        }
        lines.push(diagonal);
        // backward diagonal

        var diagonal = [];
        for (var i = 0; i < $scope.board.length; i++) {
            for (var j = 0; j < $scope.board[i].length; j++) {
                if ((i + j) === $scope.board[i].length - 1) {
                 diagonal.push($scope.board[i][j]);
                }
            }
        }
        lines.push(diagonal);
        return lines;

    };

    $scope.isWin = function() {

        function verifyArray(array) {
            var vals = _.uniq(array);
            if (vals.length != 1) {
                return false;
            }
            return vals[0] != null;
        }
        var lines = $scope.getAllPossibleLines($scope.board);
        var ok = _.map(lines, verifyArray); // -> [bool]
        if (_.any(ok)){
            return true;
        }
        return false;
    };

    $scope.aiTurn = function (whoAmI) {
        whoAmI =  whoAmI || 'O';

        function hasPlaceToWin(array) {
            var vals = _.uniq(array);
            if (vals.length !== 2) {
                return false;
            }
            if (vals.indexOf(null) === -1){
                return false;
            }

            if ( _.filter(array, function (el) {
                return el === null;
            }).length != 1){
                return false;
            }
            return array;
        }
        var lines = $scope.getAllPossibleLines($scope.board);
        var spotes = _.map(lines, hasPlaceToWin);  // [false, false, ['X', null, 'X'], ['O', 'O', null]]
        var vals = _.filter(spotes, function (el) {
            return el;
        });

        function resolveIndex(array) {
            var nullIndex = array.indexOf(null);
            var lineIndex = lines.indexOf(array);
            var i, j;
            if (lineIndex < 3) {
                i = lineIndex;
                j = nullIndex
            }
            else if (lineIndex  < 6 && lineIndex >= 3) {
                i = nullIndex;
                j = lineIndex % 3;
            }
            else if (lineIndex == 6) {
                i = nullIndex;
                j = nullIndex;
            }
            else if (lineIndex == 7) {
                i = nullIndex;
                j = 2 - nullIndex;
            }

            return [i, j];
        }
        var prioritizedMovesToWin = _.map(vals, resolveIndex)
        console.log(prioritizedMovesToWin);
        if (prioritizedMovesToWin.length >= 1){
            var k, m;
            k = prioritizedMovesToWin[0][0];
            m = prioritizedMovesToWin[0][1];
            $scope.board[k][m] = whoAmI;
        } else {
            console.log('Random move');
            var k, m;
            var attempts = 100;
            while (true) {
                k = getRandomInt(0, 3);
                m = getRandomInt(0, 3);
                if ($scope.board[k][m] === null) {
                    $scope.board[k][m] = whoAmI;
                    break;
                }
                attempts--;
                if (attempts < 0) {
                    notie.alert(1, 'It\'s a tie', 3);
                    $scope.init();
                    $scope.turnNumber = 0;
                    break;
                }
            }
        }
        return $scope.board;
    };

}]);
