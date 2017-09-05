(function() {
    'use strict';

    angular
        .module('cameraApp')
        .controller('ImageInfoDialogController', ImageInfoDialogController);

    ImageInfoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ImageInfo'];

    function ImageInfoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ImageInfo) {
        var vm = this;

        vm.imageInfo = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.imageInfo.id !== null) {
                ImageInfo.update(vm.imageInfo, onSaveSuccess, onSaveError);
            } else {
                ImageInfo.save(vm.imageInfo, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('cameraApp:imageInfoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
