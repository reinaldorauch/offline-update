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

    $scope.$on('database:update', function () {
      console.log('Update event');
      list();
    });

    function init () {
      $ionicPlatform.ready(function () {
        dbFactory.loadDb().then(list);
      });
    }

    function list() {
      console.log('Listing data');
      $ionicLoading.show({ template: 'Loading beers...' });
      return dbFactory.getBeers()
        .then(function (beers) {
          console.log(beers);
          $scope.beers = beers;
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

    $scope.beer = { id: '', name: '', email: '', city: '' };

    $scope.save = saveBeer;

    function saveBeer () {
      dbFactory.insertBeer($scope.beer)
        .then(function(res) {
            $rootScope.$emit('database:update');
            $scope.beer = { id: '', name: '', email: '', city: '' };
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
