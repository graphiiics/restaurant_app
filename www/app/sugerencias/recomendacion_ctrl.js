(function (){
	'use strict';

	angular.module('RestauranteApp')

	.controller('Recomendacion_Ctrl', ['$stateParams', '$scope', 'dataApi', '$ionicPopup', '$cordovaSocialSharing', '$window', Recomendacion_Ctrl]);

	function Recomendacion_Ctrl($stateParams, $scope, dataApi, $ionicPopup, $cordovaSocialSharing, $window){
		var vm = this;

		var task;




		   $scope.recomendarApp = function(mje) {
		  	$window.plugins.socialsharing.share(mje, null, null, 'https://play.google.com/store/apps/details?id=com.ionicframework.restaurantapp');
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