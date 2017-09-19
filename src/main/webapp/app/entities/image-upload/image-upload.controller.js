(function () {
    'use strict';

    angular
        .module('cameraApp')
        .controller('ImageUploadController', ImageUploadController);

    ImageUploadController.$inject = ['Principal', 'LoginService', '$state'];

    function ImageUploadController(Principal, LoginService, $state) {
        var vm = this;
        vm.account = null;
        vm.publish = publish;

        function publish() {
            console.log("vm.files:"+angular.toJson(vm.files));
        }
    }
})();
