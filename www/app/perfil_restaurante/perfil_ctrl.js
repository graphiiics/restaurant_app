angular.module('perfilCtrl', [])

.controller('perfilCtrl', function($scope, $stateParams, $timeout) {
    // Set Header
    //$scope.$parent.showHeader();
    //$scope.$parent.clearFabs();
    $scope.isExpanded = false;
    //$scope.$parent.setExpanded(false);
    //$scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionic.material.motion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    /*$timeout(function() {
        ionic.material.motion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);*/

    // Set Ink
    ionic.material.ink.displayEffect();
});

