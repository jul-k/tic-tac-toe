'use strict';

/**
 * @ngdoc overview
 * @name ticTacToeApp
 * @description
 * # ticTacToeApp
 *
 * Main module of the application.
 */
angular
  .module('ticTacToeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/screen.html',
        controller: 'ScreenCtrl',
        controllerAs: 'screen'
      })
      .when('/game/:player', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
