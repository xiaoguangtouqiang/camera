(function () {
    'use strict';

    angular
        .module('cameraApp')
        .controller('RegisterController', RegisterController);


    RegisterController.$inject = ['$timeout', 'Auth', '$uibModalInstance'];

    function RegisterController($timeout, Auth, $uibModalInstance) {
        var vm = this;

        vm.doNotMatch = null;
        vm.error = null;
        vm.errorUserExists = null;
        vm.register = register;
        vm.registerAccount = {};
        vm.success = null;
        vm.cancel = cancel;
        vm.getTimeStamp = getTimeStamp;
        vm.toLogin = toLogin;
        $timeout(function () {
            angular.element('#login').focus();
        });

        vm.getTimeStamp();

        function register() {
            vm.registerAccount.email = vm.registerAccount.login;
            vm.registerAccount.langKey = 'zh-cn';
            vm.doNotMatch = null;
            vm.error = null;
            vm.errorUserExists = null;
            vm.errorEmailExists = null;

            Auth.createAccount(vm.registerAccount).then(function () {
                vm.success = 'OK';
                $timeout(function () {
                    vm.toLogin();
                }, 5000);
            }).catch(function (response) {
                vm.success = null;
                if (response.status === 400 && response.data === 'login already in use') {
                    vm.errorUserExists = 'ERROR';
                } else if (response.status === 400 && response.data === 'email address already in use') {
                    vm.errorEmailExists = 'ERROR';
                } else {
                    vm.error = 'ERROR';
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function getTimeStamp() {
            vm.timestamp = new Date().getTime();
        }

        function toLogin() {
            $uibModalInstance.close(vm.registerAccount.login);
        }
    }
})();
