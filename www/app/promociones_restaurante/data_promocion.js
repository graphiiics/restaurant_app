(function () {
    'use strict';

    angular.module('RestauranteApp')

    .controller('Promocion_Restaurante_Ctrl', ['$stateParams', 'dataApi', '$scope', '$window',  Promocion_Restaurante_Ctrl]);

    function Promocion_Restaurante_Ctrl($stateParams, dataApi, $scope, $window) {
        var vm = this;

        var promocionId = Number($stateParams.id);
        vm.promocion_id = promocionId; 

        console.log("promocion id-->", promocionId);
        console.log("vm.promocion_id  -->", vm.promocion_id);


        dataApi.getPromocion(promocionId).then(function(data){
            vm.promocion = data.promocion;
            console.log("vm.promocion since of $http-->", vm.promocion );
            console.log("vm.promocion.id since of $http-->", vm.promocion.id_restaurante );
            //console.log("vm.promocion[0].promocionId since of $http-->", vm.promocion[0].id );
            vm.restaurante_id = vm.promocion.id_restaurante; 
            //console.log("id_restaurante since of $http-->", vm.promocion[0].id );
            var link = 'http://graphiiics.com/public/promo/restaurante_'+vm.promocion.id_restaurante+'/'+vm.promocion.imagen;
            console.log("link promo", link);
            $scope.compartirFacebook = function() {
                $window.plugins.socialsharing.shareViaFacebook(null, link , null /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
            }

            $scope.compartirTwitter = function() {
                $window.plugins.socialsharing.shareViaTwitter(null, link, null);
            }
        });

        




    };
})();
