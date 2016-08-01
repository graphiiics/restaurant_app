(function () {
    'use strict';

    angular.module('RestauranteApp')

    .controller('Fotos_Restaurante_Ctrl', ['$stateParams', 'dataApi', '$scope', '$ionicModal', Fotos_Restaurante_Ctrl]);

    function Fotos_Restaurante_Ctrl($stateParams, dataApi, $scope, $ionicModal) {
        var vm = this;

        var restauranteId = Number($stateParams.id);
        vm.restaurante_id = restauranteId; 

        console.log("Restaurante id-->", restauranteId);
        console.log("vm.restaurante_id  -->", vm.restaurante_id);

        //----------------------------------------------------------------
        //                      Test de post

        //dataApi.setUsuario(restauranteId);
        //----------------------------------------------------------------

        dataApi.getFotosRestaurante(restauranteId).then(function(data){
        vm.fotos_restaurante = data.fotos_restaurante;
        console.log("vm.menu since of $http-->", vm.fotos_restaurante );
         var jsonArr = [];
           for(var i = 0; i < vm.fotos_restaurante.length; i++) {
                jsonArr.push({
                    src: 'http://graphiiics.com/public/fotos/restaurante_'+vm.fotos_restaurante[i].id_restaurante+'/'+vm.fotos_restaurante[i].foto,
                });

            }
             
             console.log("jsonArr", jsonArr);  
              $scope.allImages = jsonArr;
            });

       /* dataApi.getFotosRestaurante(restauranteId).then(function(data){
            vm.fotos_restaurante = data.fotos_restaurante;
            console.log("vm.fotos_restaurante since of $http-->", vm.fotos_restaurante );
        });


        $scope.allImages = [
            { 'src' : 'img/foto_mogi_1.jpg' },
            { 'src' : 'img/foto_mogi_2.jpg' },
            { 'src' : 'img/foto_mogi_3.jpg' },
            { 'src' : 'img/foto_mogi_4.jpg' },
            { 'src' : 'img/foto_mogi_5.jpg' },
            { 'src' : 'img/foto_mogi_6.jpg' },
            { 'src' : 'img/foto_mogi_7.jpg' }
        ]; */

        $scope.showImages = function(index) {
            $scope.activeSlide = index;
            $scope.showModal('app/fotos_restaurante/visor_galeria_fotos.html');
            console.log("Hasta aqui ando bien");
        }

        $scope.showModal = function(templateUrl) {
        console.log(templateUrl);
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
        }

        // Close the modal
        $scope.closeModal = function() {
            $scope.modal.hide();
            $scope.modal.remove()
        }

    };
})();


