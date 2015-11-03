(function () {
  'use strict';

  var beers = angular.module('beers', ['core']);

  beers.config(routes);

  routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routes ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('list', {
        url: '/list',
        views: {
          'menuContent': {
            templateUrl: 'app/beers/beers.list.html',
            controller: 'AppCtrl'
          }
        }
      })

      .state('form', {
        url: '/form/:id',
        views: {
          'menuContent': {
            templateUrl: 'app/beers/beers.form.html',
            controller: 'FormController'
          }
        }
      });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/list');

  }
})();