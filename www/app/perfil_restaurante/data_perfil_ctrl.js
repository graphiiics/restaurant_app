(function () {
    'use strict';

    angular.module('RestauranteApp').controller('Perfil_Restaurante_Ctrl', ['$stateParams', 'dataApi', '$scope', '$ionicPopup', '$timeout', '$cordovaSocialSharing','$window', '$translate', Perfil_Restaurante_Ctrl]);

    function Perfil_Restaurante_Ctrl($stateParams, dataApi, $scope, $ionicPopup, $timeout, $cordovaSocialSharing, $window, $translate) {
        var vm = this;

        var rango;
        var restaurante;

        var calificacion;
        var id_calf;

        //var restauranteId = Number($stateParams.id);
        var restauranteId = $stateParams.id;
        console.log("El id del restaurante de la url es-->", restauranteId);
        dataApi.updateCalificacion(restauranteId);


        //$scope.checked = 0;

        dataApi.getRestaurantes().then(function(data){
            console.log("Entre a esta mmda");
            vm.restaurante = _.find(data.restaurantes, { "id": restauranteId });
            console.log("*vm.restaurante since of $http-->", vm.restaurante );
            rango = vm.restaurante.rango_precio;
            restaurante = vm.restaurante.nombre;

            $scope.openWebSite = function() {
              $window.open(vm.restaurante.sitio_web, '_blank', 'location=yes');
            }
            $scope.openFacebook = function() {
              $window.open(vm.restaurante.url_facebook, '_blank', 'location=yes');
            }
            $scope.openTwitter = function() {
              $window.open(vm.restaurante.url_twitter, '_blank', 'location=yes');
            }  
           
        });

       
        dataApi.getSuscripcion(restauranteId).then(function(data){

          if(data == 1){
            $scope.checked = true;
          }else{
            $scope.checked = false;
          }
          
          console.log("checked", data);
        });
       

        $scope.toggleIcon = function($event, iconName) {
          var buttonClasses = $event.currentTarget.className;
          if (buttonClasses.indexOf(iconName + '-blank') > 0) {
            buttonClasses = buttonClasses.replace('-blank', '');
          } else {
            buttonClasses = buttonClasses.replace(iconName, iconName + '-blank');
          }
          $event.currentTarget.className = buttonClasses;
        }

        

        $scope.getRangoDePrecio = function() {
            return new Array(rango);   
        }

        $scope.suscribir = function($event, iconName) {
            dataApi.setSuscripcion(restauranteId);
            console.log("Se suscribio al restaurante", restauranteId);

            var buttonClasses = $event.currentTarget.className;
            console.log("buttonClasses--> ",buttonClasses);
            if (buttonClasses.indexOf(iconName + '-blank') > 0) {
              buttonClasses = buttonClasses.replace('-blank', '');
            } else {
              buttonClasses = buttonClasses.replace(iconName, iconName + '-blank');
            }
            $event.currentTarget.className = buttonClasses;
        }

        $scope.showPopup = function() {
          dataApi.getCalificacion(restauranteId).then(function(data){
            if(data != 0)
            {
              calificacion = data.calificacion;
              id_calf = data.id;
              console.log("Objeto calificacion y id--->", calificacion , id_calf);
            }else
              {
                calificacion = 0;
                id_calf = 0;
                console.log("Calificacion no existe");
              }

              $scope.ratingsObject = {
              iconOn : 'ion-ios-star',
              iconOff : 'ion-ios-star-outline',
              //iconOnColor: 'rgb(200, 200, 100)',
              //iconOffColor:  'rgb(200, 100, 100)',
              rating:  calificacion,
              minRating:0,
              callback: function(rating) {
                $scope.ratingsCallback(rating);
              }
            };

            $scope.myPopup = $ionicPopup.show({
            template: '<ionic-ratings ratingsobj="ratingsObject"></ionic-ratings>',
            title: "Calificación / Score",
            scope: $scope 
          });
           
        });
          

         };

        

      $scope.ratingsCallback = function(rating) {
        console.log('Selected rating is : ', rating);
        dataApi.setCalificacion(id_calf,rating,restauranteId);
        $scope.myPopup.close();
        console.log("var calificacion since callback--->", calificacion);

      };

      $scope.compartir = function() {
            $window.plugins.socialsharing.share( restaurante + " - Ven y disfruta de este magnifico restaurante. Te lo recomiendo!");
              
        }
      $scope.shareAnywhere = function() {
        
        //$window.plugins.socialsharing.share(restaurante);
        $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "http://blog.nraboy.com");
        }
 
    $scope.shareViaTwitter = function(message, image, link) {
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        }, function(error) {
            alert("Cannot share on Twitter");
        });
        }

    $scope.ChangeLanguage = function(lang){
    $translate.use(lang);
    }
   

    };
})();


