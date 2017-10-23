(function () {
    'use strict';

    angular
        .module('cameraApp')
        .controller('ImageUploadController', ImageUploadController);

    ImageUploadController.$inject = ['Principal', 'LoginService', '$state', 'Photo'];

    function ImageUploadController(Principal, LoginService, $state, Photo) {
        var vm = this;
        vm.account = null;
        vm.publish = publish;
        vm.photo = {};

        function publish() {
            Photo.save(vm.photo, function () {
                $state.go('user-posts');
            })
        }
    }
})();
