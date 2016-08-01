(function (){
	'use strict';

	angular.module('RestauranteApp')

	.controller('Suscribir_Ctrl', ['$stateParams','dataApi', '$cordovaDevice', Suscribir_Ctrl]);

	function Suscribir_Ctrl($stateParams, dataApi, $cordovaDevice){
		var vm = this;

		var restauranteId = Number($stateParams.id);
		console.log('Entre a suscribir a-->'+ restauranteId );

	}

	
  
})();