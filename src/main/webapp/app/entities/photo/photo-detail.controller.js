(function() {
    'use strict';

    angular
        .module('cameraApp')
        .controller('PhotoDetailController', PhotoDetailController);

    PhotoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Photo'];

    function PhotoDetailController($scope, $rootScope, $stateParams, previousState, entity, Photo) {
        var vm = this;

        vm.photo = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('cameraApp:photoUpdate', function(event, result) {
            vm.photo = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
