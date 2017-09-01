(function() {
    'use strict';

    angular
        .module('cameraApp')
        .controller('ImageInfoDeleteController',ImageInfoDeleteController);

    ImageInfoDeleteController.$inject = ['$uibModalInstance', 'entity', 'ImageInfo'];

    function ImageInfoDeleteController($uibModalInstance, entity, ImageInfo) {
        var vm = this;
        vm.imageInfo = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ImageInfo.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
