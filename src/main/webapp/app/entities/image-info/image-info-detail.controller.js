(function() {
    'use strict';

    angular
        .module('cameraApp')
        .controller('ImageInfoDetailController', ImageInfoDetailController);

    ImageInfoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ImageInfo'];

    function ImageInfoDetailController($scope, $rootScope, $stateParams, previousState, entity, ImageInfo) {
        var vm = this;

        vm.imageInfo = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('cameraApp:imageInfoUpdate', function(event, result) {
            vm.imageInfo = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
