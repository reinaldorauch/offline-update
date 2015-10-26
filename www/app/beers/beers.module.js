(function () {
  'use strict';

  var beers = angular.module('beers', []);

  beers.config(routes);

  routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routes ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/list',
        views: {
          'menuContent': {
            templateUrl: 'app/beers/beers.list.html'
          }
        }
      })

      .state('form', {
        url: '/form',
        views: {
          'menuContent': {
            templateUrl: 'app/beers/beers.form.html'
          }
        }
      });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/list');

  }
})();