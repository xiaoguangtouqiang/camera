(function() {
    'use strict';

    angular
        .module('cameraApp')
        .controller('ImageInfoDialogController', ImageInfoDialogController);

    ImageInfoDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'ImageInfo'];

    function ImageInfoDialogController ($scope, $stateParams, $uibModalInstance, entity, ImageInfo) {
        var vm = this;
        vm.imageInfo = entity;
        vm.load = function(id) {
            ImageInfo.get({id : id}, function(result) {
                vm.imageInfo = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('cameraApp:imageInfoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.imageInfo.id !== null) {
                ImageInfo.update(vm.imageInfo, onSaveSuccess, onSaveError);
            } else {
                ImageInfo.save(vm.imageInfo, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
