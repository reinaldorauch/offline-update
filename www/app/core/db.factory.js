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
      getBeer: getBeer,
      updateBeer: updateBeer,
      insertBeer: insertBeer,
      removeBeer: removeBeer
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

      var q = 'CREATE TABLE IF NOT EXISTS people (' +
        'id VARCHAR(255) PRIMARY KEY, ' +
        'name VARCHAR(255) NOT NULL, ' +
        'email VARCHAR(255) NOT NULL, ' +
        'city VARCHAR(255) NOT NULL, ' +
        'upd VARCHAR(25) NOT NULL' +
      ')';

      return $cordovaSQLite.execute(sqliteDb, q);
    }

    function getBeers () {
      return $cordovaSQLite.execute(sqliteDb, 'SELECT * FROM people')
        .then(function (res) {
          inMemory = [];
          for (var i = 0; i < res.rows.length; i++) {
            inMemory.push(res.rows.item(i));
          }
          return inMemory;
        });
    }

    function getBeer (id) {
      return $q(function (res) {
        for (var i = 0; i < inMemory.length; i++) {
          if(inMemory[i].id === id) {
            return res(inMemory[i]);
          }
        }

        var q = 'SELECT * FROM people WHERE id = ?';
        return $cordovaSQLite.execute(sqliteDb, q, [id]);
      });
    }

    function insertBeer (people) {
      people.upd = new Date();
      var q = 'INSERT INTO people (id, name, email, city, upd) VALUES (?, ?, ?, ?, ?)';
      var data = [people.id, people.name, people.email, people.city, people.upd.toISOString()];
      return $cordovaSQLite.execute(sqliteDb, q, data)
        .then(function (res) {
          var obj = angular.copy(people);
          inMemory.push(obj);
          return obj;
        });
    }

    function updateBeer (people) {
      people.upd = new Date();
      var q = 'UPDATE people SET name = ?, email = ?, city = ?, upd = ? WHERE id = ?';
      var data = [people.name, people.email, people.city, people.upd.toISOString(), people.id];
      return $cordovaSQLite.execute(sqliteDb, q, data)
        .then(function () {
          for(var i = 0; i < inMemory.length; i++) {
            if(inMemory[i].id === people.id) {
              inMemory[i] = people;
            }
          }
        });
    }

    function removeBeer (id) {
      var q = 'DELETE FROM people WHERE id = ?';
      var data = [id];
      return $cordovaSQLite.execute(sqliteDb, q, data)
        .then(function () {
          for (var i = 0; i < inMemory.length; i++) {
            if(inMemory[i].id === id) {
              inMemory.splice(i, 1);
            }
          };
        });
    }

  }

})();