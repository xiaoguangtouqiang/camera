(function() {
    'use strict';

    angular
        .module('cameraApp')
        .controller('ImageInfoDeleteController',ImageInfoDeleteController);

    ImageInfoDeleteController.$inject = ['$uibModalInstance', 'entity', 'ImageInfo'];

    function ImageInfoDeleteController($uibModalInstance, entity, ImageInfo) {
        var vm = this;

        vm.imageInfo = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ImageInfo.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
