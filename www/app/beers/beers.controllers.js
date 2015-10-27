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

    console.log('Loading AppCtrl');
    init();

    function init () {
      $ionicLoading.show({ template: 'Loading beers...' });
      $ionicPlatform.ready(function () {
        dbFactory.loadDb()
          .then(function () {
            return dbFactory.getBeers()
              .then(function (beers) {
                console.log(beers);
                $scope.beers = beers;
                $ionicLoading.hide();
              });
          });
      });
    }
  }

  /**
   * FORM CONTROLLER
   */

  beers.controller('FormController', FormController);

  FormController.$inject = ['dbFactory', '$ionicPopup', '$state', '$scope'];

  function FormController (dbFactory, $ionicPopup, $state, $scope) {

    $scope.beer = {
      id: '',
      name: ''
    };

    $scope.save = saveBeer;

    function saveBeer () {
      dbFactory.insertBeer($scope.beer)
        .then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
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
