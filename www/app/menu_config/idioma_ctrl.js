(function () {
    'use strict';

    angular.module('RestauranteApp').controller('Idioma_Ctrl', ['$scope', '$translate', '$cordovaDatePicker',  Idioma_Ctrl]);

    function Idioma_Ctrl($scope, $translate, $cordovaDatePicker) {
        var vm = this;

        
    $scope.ChangeLanguage = function(lang){
    $translate.use(lang);
    }


    };
})();