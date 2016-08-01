(function () {
    'use strict';

    angular.module('RestauranteApp')

    .controller('Promociones_Restaurante_Ctrl', ['$stateParams', 'dataApi', '$scope', '$ionicModal', '$state', Promociones_Restaurante_Ctrl]);

    function Promociones_Restaurante_Ctrl($stateParams, dataApi, $scope, $ionicModal, $state) {
        var vm = this;

        var restauranteId = Number($stateParams.id);
        vm.restaurante_id = restauranteId; 

        console.log("Restaurante id-->", restauranteId);
        console.log("vm.restaurante_id  -->", vm.restaurante_id);


        dataApi.getPromocionesRestaurante(restauranteId).then(function(data){
            vm.promociones = data.promociones;
            console.log("vm.promociones since of $http-->", vm.promociones );
            for(var i = 0; i < vm.promociones.length; i++) {
            console.log('Holi-->'+i);
            }
        });


       
        $scope.visualizarPromo = function(index) {
            //$scope.activeSlide = index;
            $state.go("app.promocion");
        }

        $scope.promo = function() {
            //$scope.activeSlide = index;
            console.log("Whatever");
            //$state.go("app.promo/" + index);
        }

        $scope.showImages_ = function(index) {
            $scope.activeSlide = index;
            $scope.showModal('app/promociones_restaurante/visor_galeria_promociones.html');
            console.log("Hasta aqui en promocion fb");
        }

        $scope.showModal_ = function(templateUrl) {
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
        $scope.closeModal_ = function() {
            $scope.modal.hide();
            $scope.modal.remove()
        }

    };
})();

