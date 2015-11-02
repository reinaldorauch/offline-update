(function () {
  'use strict';

  var core = angular.module('core');

  core.factory('dbFactory', dbFactory);

  dbFactory.$inject = ['$cordovaSQLite', '$q'];

  function dbFactory ($cordovaSQLite, $q) {
    var inMemory = [];
    var sqliteDb;

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
        inMemory = [];
        sqliteDb = sqliteDb || $cordovaSQLite.openDB('app.db');
      } catch(e) {
        console.error(e.stack);
        throw e;
      }

      var q = 'CREATE TABLE IF NOT EXISTS beers (' +
        'id VARCHAR(255) PRIMARY KEY, ' +
        'name VARCHAR(255) NOT NULL' +
      ')';

      return $cordovaSQLite.execute(sqliteDb, q);
    }

    function getBeers () {
      return $cordovaSQLite.execute(sqliteDb, 'SELECT * FROM beers')
        .then(function (res) {
          inMemory = [];
          for (var i = 0; i < res.rows.length; i++) {
            inMemory.push(res.rows.item(i));
          }
          return inMemory;
        });
    }

    function insertBeer (beer) {
      var q = 'INSERT INTO beers (id, name) VALUES (?, ?)';
      var data = [beer.id, beer.name];
      return $cordovaSQLite.execute(sqliteDb, q, data)
        .then(function (res) {
          var obj = angular.copy(beer);
          inMemory.push(obj);
          return obj;
        });
    }

  }

})();