var lat = 0;
var lng = 0;

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $timeout, Openwhisk) {

  console.log("entro en ctrl");

  $scope.geolocation = {};
  $scope.geolocation.latitude = "";
  $scope.geolocation.longitude = "";
  $scope.weathericon = "img/weather.png";
  $scope.wicon="";

  $scope.weffect = "sunny";


  $scope.changehash = function(slide) {
    window.location.hash = slide;
  }

  $scope.checkicon= function(icon){

      $scope.changehash("slide-5");
    /*if(icon>=5 && icon <=18){
        $scope.changehash("slide-1");

    }else{
      if(icon>=0 && icon <=4 ){
          $scope.changehash("slide-5");

      }else{

        if((icon>=19 && icon <=34 ) || icon == 36){
            $scope.changehash("slide-3");

        }else{
          if(icon==35 ){
              $scope.changehash("slide-1");

          }else{
            if(icon>=37 && icon <=40 ){
                $scope.changehash("slide-3");

            }else{
              if(icon>=41 && icon <=47 ){
                  $scope.changehash("slide-3");

              }
            }

          }

        }

      }
    }*/
  }






  $scope.watchLocation = function() {



    function onSuccess(position) {

      $scope.$apply(function() {

        $scope.geolocation.latitude = position.coords.latitude;
        $scope.geolocation.longitude = position.coords.longitude;

        if(lat!=position.coords.latitude && lng !=position.coords.longitude){

        Openwhisk.getweather($scope.geolocation.latitude, $scope.geolocation.longitude).then(function(Data) {
        //  alert(JSON.stringify(Data.data.response.result.forecasts));

        $scope.items=Data.data.response.result.forecasts;
        $scope.today = $scope.items[1];
        $scope.items.splice(0,1);

          if($scope.today.day){
          $scope.icon= $scope.today.day.icon_code;
          $scope.grados = $scope.today.day.temp;


          }
          else{
            $scope.icon= $scope.today.night.icon_code;
            $scope.grados = $scope.today.night.temp;

          }

          $scope.checkicon($scope.icon);
          $scope.wicon = "img/weathericons/icon"+$scope.icon+".png";
          $scope.weatherdesc = $scope.today.narrative;
          $scope.day= $scope.today.dow;


          lat = position.coords.latitude;
          lng = position.coords.longitude;


        }, function(err) {
          alert(JSON.stringify(err));
        });

}




      });



    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }

    // Options: throw an error if no update is received every 30 seconds.
    //
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
      timeout: 3000000
    });

  }

  $scope.watchLocation();




});
