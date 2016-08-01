(function (){
	'use strict';

	angular.module('RestauranteApp')

	.controller('Sugerencias_Ctrl', ['$stateParams', '$scope', 'dataApi', '$ionicPopup', '$cordovaDatePicker', '$state',  Sugerencias_Ctrl]);

	function Sugerencias_Ctrl($stateParams, $scope, dataApi, $ionicPopup, $cordovaDatePicker, $state){
		var vm = this;

		var task;



		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    if(dd<10){
	        dd='0'+dd
	    } 
	    if(mm<10){
	        mm='0'+mm
	    } 
	    var today = yyyy+'-'+mm+'-'+dd;
	   
		console.log("today ", today);

		   $scope.createTask = function(task) {
		    dataApi.setSugerencia(today, task);
		  	console.log("Sugerencia-->", task );
		  };

		 
		  $scope.showAlert = function() {
		   var alertPopup = $ionicPopup.alert({
		     title: 'Enviado/Sent'
		   });
		   alertPopup.then(function(res) {
		     console.log('Thank you for not eating my delicious ice cream cone');
		   });
		 };

		

	}	
  
})();