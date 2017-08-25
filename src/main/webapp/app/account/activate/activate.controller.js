(function() {
    'use strict';

    angular
        .module('cameraApp')
        .controller('ActivationController', ActivationController);

    ActivationController.$inject = ['$stateParams', 'Auth', 'LoginService'];

    function ActivationController ($stateParams, Auth, LoginService) {
        var vm = this;

        // Auth.activateAccount({key: $stateParams.key}).then(function () {
        //     vm.error = null;
        //     vm.success = 'OK';
        // }).catch(function () {
        //     vm.success = null;
        //     vm.error = 'ERROR';
        // });
        vm.registerEmail = "18301870773@163.com";
        vm.login = LoginService.open;
    }
})();
