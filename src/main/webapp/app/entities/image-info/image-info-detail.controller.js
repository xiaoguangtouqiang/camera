(function() {
    'use strict';

    angular
        .module('cameraApp')
        .controller('ImageInfoDetailController', ImageInfoDetailController);

    ImageInfoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ImageInfo'];

    function ImageInfoDetailController($scope, $rootScope, $stateParams, entity, ImageInfo) {
        var vm = this;
        vm.imageInfo = entity;
        vm.load = function (id) {
            ImageInfo.get({id: id}, function(result) {
                vm.imageInfo = result;
            });
        };
        var unsubscribe = $rootScope.$on('cameraApp:imageInfoUpdate', function(event, result) {
            vm.imageInfo = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
