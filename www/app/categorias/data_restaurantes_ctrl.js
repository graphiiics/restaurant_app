(function () {
    'use strict';

    angular.module('RestauranteApp').controller('DatosRestaurantesCtrl', ['$stateParams','dataApi', '$cordovaGeolocation', DatosRestaurantesCtrl]);

    function DatosRestaurantesCtrl($stateParams, dataApi, $cordovaGeolocation) {
        var vm = this;

  
        
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


        var idCate = String($stateParams.id);
        console.log("Categoria-->", idCate);
        
        /*dataApi.getRestaurantes().then(function(data){
            vm.restaurantes = data.restaurantes;
        });
/**/
        dataApi.getRestaurantes().then(function(data){
            console.log("Entre a la funcion de getRestaurantes()");
            vm.restaurantes =  _.filter(data.restaurantes, { "categoria": idCate });
            console.log("vm.restaurantes since of lista Categoria.js-->", vm.restaurantes );


            for(var i = 0; i < vm.restaurantes.length; i++) 
            {
                var from = new google.maps.LatLng(vm.lat, vm.lng);
                var to = new google.maps.LatLng(vm.restaurantes[i].latitud, vm.restaurantes[i].longitud);
                var dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
                var km = (dist/1000).toFixed(1);
                console.log("Distancia--->"+km);
                vm.restaurantes[i].estatus = km;
            }
           
        });

    };
})();
