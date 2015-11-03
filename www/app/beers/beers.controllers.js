(function () {
  'use strict';
  var beers = angular.module('beers');

  /**
   * LIST CONTROLLER
   */

  beers.controller('AppCtrl', AppCtrl);

  AppCtrl.$inject = ['$ionicLoading', '$ionicPlatform', 'dbFactory', '$scope', '$ionicPopup'];

  function AppCtrl($ionicLoading, $ionicPlatform, dbFactory, $scope, $ionicPopup) {

    $scope.beers = [];

    init();

    $scope.$on('database:update', function () {
      console.log('Update event');
      list();
    });

    $scope.onHold = onHold;

    function init () {
      $ionicPlatform.ready(function () {
        dbFactory.loadDb().then(list);
      });
    }

    function list() {
      var onLoad = function (beers) {
        console.log(beers);
        $scope.beers = beers;
        $ionicLoading.hide();
      };

      console.log('Listing data');
      $ionicLoading.show({ template: 'Loading beers...' });
      return dbFactory.getBeers()
        .then(onLoad);
    }

    function onHold (beer) {
      $ionicPopup.confirm({
        title: 'Remoção',
        template: 'Tem certeza que deseja remover este item?'
      })
      .then(function (res) {
        if(res) {
          return removeBeer(beer.id);
        }
      });
    }

    function removeBeer (id) {
      $ionicLoading.show({template: 'Removing beer...'});
      return dbFactory.removeBeer(id)
        .then(function () {
          $ionicLoading.hide();
        });
    }
  }

  /**
   * FORM CONTROLLER
   */

  beers.controller('FormController', FormController);

  FormController.$inject = ['dbFactory', '$ionicPopup', '$state', '$scope', '$rootScope', '$stateParams', '$ionicLoading'];

  function FormController (dbFactory, $ionicPopup, $state, $scope, $rootScope, $stateParams, $ionicLoading) {

    $scope.beer = { id: '', name: '', email: '', city: '' };

    $scope.save = saveBeer;

    init();

    function init () {
      if($stateParams.id) {
        loadBeer($stateParams.id);
      }
    }

    function saveBeer () {
      var resolve = function(res) {
        $scope.beer = { id: '', name: '', email: '', city: '' };
      };

      var reject = function (err) {
        console.error(err);
      };

      var persist = $stateParams.id ? dbFactory.updateBeer : dbFactory.insertBeer;

      persist($scope.beer)
        .then(resolve, reject);
    }

    function handleError(err) {
      $ionicPopup.alert({
        title: 'Error on inserting beer on the database',
        template: err.stack
      });
    }

    function loadBeer (id) {
      var res = function (beer) {
        $scope.beer = beer;
        $ionicLoading.hide();
      };

      $ionicLoading.show({ template: 'Loading beer...' });
      dbFactory.getBeer(id)
        .then(res);
    }
  }

})();
