(function () {
  'use strict';
  var beers = angular.module('beers');

  /**
   * LIST CONTROLLER
   */

  beers.controller('AppCtrl', AppCtrl);

  AppCtrl.$inject = ['$ionicLoading', '$ionicPlatform', 'dbFactory', '$scope'];

  function AppCtrl($ionicLoading, $ionicPlatform, dbFactory, $scope) {

    $scope.beers = [];

    init();

    $scope.$on('update', function () {
      list();
    });

    function init () {
      $ionicPlatform.ready(function () {
        dbFactory.loadDb().then(list);
      });
    }

    function list() {
      $ionicLoading.show({ template: 'Loading beers...' });
      return dbFactory.getBeers()
        .then(function (beers) {
          var list = [];
          for (var i = 0; i < beers.rows.length; i++) {
            list.push(beers.rows.item(i));
          }
          console.log(list);
          $scope.beers = list;
          $ionicLoading.hide();
        });
    }
  }

  /**
   * FORM CONTROLLER
   */

  beers.controller('FormController', FormController);

  FormController.$inject = ['dbFactory', '$ionicPopup', '$state', '$scope', '$rootScope'];

  function FormController (dbFactory, $ionicPopup, $state, $scope, $rootScope) {

    $scope.beer = {
      id: '',
      name: ''
    };

    $scope.save = saveBeer;

    function saveBeer () {
      dbFactory.insertBeer($scope.beer)
        .then(function(res) {
            $rootScope.$emit('update');
        }, function (err) {
            console.error(err);
        });
    }

    function handleError(err) {
      $ionicPopup.alert({
        title: 'Error on inserting beer on the database',
        template: err.stack
      });
    }
  }

})();
