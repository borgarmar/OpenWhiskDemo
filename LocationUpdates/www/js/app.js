// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['starter.controllers'])


.factory('Openwhisk', function($q, $http) {

  return {
    getweather: function(lat, lng) {
      var q = $q.defer();


      $http({
        method: 'POST',
        url: 'https://openwhisk.ng.bluemix.net/api/v1/namespaces/***/actions/My%20Action%20Sequence?blocking=true',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ***'
        },
        data: { "lat": lat, "lng": lng}
      }).then(function successCallback(response) {

          q.resolve(response);

      }, function errorCallback(err) {

        q.reject(err);

      });




      return q.promise;
    }
  }

});
