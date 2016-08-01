(function () {
    'use strict';

    angular.module('RestauranteApp').controller('DatosBusquedaNombreCtrl', ['$stateParams','dataApi', '$scope', '$cordovaGeolocation', '$q', DatosBusquedaNombreCtrl]);

    function DatosBusquedaNombreCtrl($stateParams, dataApi, $scope, $cordovaGeolocation, $q) {
        var vm = this;
        var deferred = $q.defer();


        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          vm.lat  = position.coords.latitude
          vm.lng = position.coords.longitude
          
          //alert(lat + " --- " + lng);
        }, function(err) {
        // error
        });



        dataApi.getRestaurantes().then(function(data){
            

           for(var i = 0; i < data.restaurantes.length; i++) 
            {
                var from = new google.maps.LatLng(vm.lat, vm.lng);
                var to = new google.maps.LatLng(data.restaurantes[i].latitud, data.restaurantes[i].longitud);
                var dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
                var km = (dist/1000).toFixed(1);
                console.log("Distancia--->"+km);
                data.restaurantes[i].distancia = km;

            }

            console.log("Entre a la funcion de getRestaurantes()");
            vm.restaurantes = data.restaurantes;
            console.log("vm.restaurantes desde busqueda xxx-->", vm.restaurantes );

            return deferred.promise;

        });





        

    };
})();