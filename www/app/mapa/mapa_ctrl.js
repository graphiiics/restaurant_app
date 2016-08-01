(function (){
	'use strict';

	angular.module('RestauranteApp')

	.controller('Mapa_Ctrl', ['$stateParams', '$scope', '$cordovaGeolocation', 'dataApi', '$window',   Mapa_Ctrl]);

	function Mapa_Ctrl($stateParams, $scope, $cordovaGeolocation, dataApi, $window){
		var vm = this;

		var restauranteId = Number($stateParams.id);
        vm.restaurante_id = restauranteId;

         //Esta funcion es para obtener mi ubicacion y marcar en donde estoy
	    var posOptions = {timeout: 10000, enableHighAccuracy: false};
		$cordovaGeolocation
      	.getCurrentPosition(posOptions)
      	.then(function (position) {
          var lat  = position.coords.latitude
          var lng = position.coords.longitude
          vm.markerMyselft = {
	        id: 1,
	        cordenadas: {
	            latitude: lat,
	            longitude: lng
	        },
	        options: { draggable: false }
	    	};
          //alert(lat + " --- " + lng);
      	}, function(err) {
        // error
    	});


        dataApi.getRestaurante(restauranteId).then(function(data){


            vm.restaurante = data.restaurante;
            console.log("vm.restaurante since of $http-->", vm.restaurante );
            
            vm.map = {
			center: {
				latitude: vm.restaurante.latitud,
				longitude: vm.restaurante.longitud,
			},
			zoom: 16
			};

			vm.markerRestaurante = {
	        id: 0,
	        coords: {
	            latitude: vm.restaurante.latitud,
	            longitude: vm.restaurante.longitud,
	        },
	        options: { draggable: false }
	    	};

	    	var from = new google.maps.LatLng(vm.map.center.latitude, vm.map.center.longitude);
          	var to = new google.maps.LatLng(vm.markerMyselft.cordenadas.latitude, vm.markerMyselft.cordenadas.longitude);
          	var dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
          	var km = (dist/1000).toFixed(1);
          	console.log("Distancia--->"+km);

	    	//alert(vm.map.center.latitude + " --- " + vm.map.center.longitude);

	    	$scope.getRuta = function() 
      		{
				//console.log("https://www.google.com.mx/maps/dir/"+vm.map.center.latitude+","+vm.map.center.longitude+"/"+vm.markerMyselft.cordenadas.latitude+","+vm.markerMyselft.cordenadas.longitude+"/");
				$window.open("https://www.google.com.mx/maps/dir/"+vm.map.center.latitude+","+vm.map.center.longitude+"/"+vm.markerMyselft.cordenadas.latitude+","+vm.markerMyselft.cordenadas.longitude+"/", '_blank', 'location=yes');
            }
        }); 

	}


	
  
})();