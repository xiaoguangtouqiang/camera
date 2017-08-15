(function () {
    'use strict';

    angular
        .module('cameraApp')
        .controller('ImageUploadController', ImageUploadController);

    ImageUploadController.$inject = ['Principal', 'LoginService', '$state'];

    function ImageUploadController(Principal, LoginService, $state) {
        var vm = this;
        vm.account = null;


    }
})();
