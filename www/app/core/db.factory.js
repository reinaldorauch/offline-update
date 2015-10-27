(function () {
  'use strict';

  var core = angular.module('core');

  core.factory('dbFactory', dbFactory);

  dbFactory.$inject = ['$cordovaSQLite', '$q'];

  function dbFactory ($cordovaSQLite, $q) {
    var db;

    var service = {
      loadDb: openDb,
      getBeers: getBeers,
      insertBeer: insertBeer
    };

    return service;

    // IMPLEMENTATION

    function openDb () {
      console.log('Opening database');

      try {
        db = db || $cordovaSQLite.openDB('app.db');
      } catch(e) {
        console.error(e.stack);
        throw e;
      }

      var q = 'CREATE TABLE IF NOT EXISTS beers (' +
        'id VARCHAR(255) PRIMARY KEY, ' +
        'name VARCHAR(255) NOT NULL' +
      ')';

      return $cordovaSQLite.execute(db, q);
    }

    function getBeers () {
      return $cordovaSQLite.execute(db, 'SELECT * FROM beers');
    }

    function insertBeer (beer) {
      var q = 'INSERT INTO beers (id, name) VALUE (?, ?)';
      var data = [beer.id, beer.name];
      console.log(beer, data);
      return $cordovaSQLite.execute(db, q, data);
    }

  }

})();