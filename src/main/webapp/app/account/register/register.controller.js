(function () {
    'use strict';

    angular
        .module('cameraApp')
        .controller('RegisterController', RegisterController);


    RegisterController.$inject = ['$timeout', 'Auth', 'LoginService', '$uibModalInstance'];

    function RegisterController($timeout, Auth, LoginService, $uibModalInstance) {
        var vm = this;

        vm.doNotMatch = null;
        vm.error = null;
        vm.errorUserExists = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.registerAccount = {};
        vm.success = null;
        vm.cancel = cancel;
        vm.getTimeStamp = getTimeStamp;
        $timeout(function () {
            angular.element('#login').focus();
        });

        vm.getTimeStamp();

        function register() {

            vm.registerAccount.langKey = 'zh-cn';
            vm.doNotMatch = null;
            vm.error = null;
            vm.errorUserExists = null;
            vm.errorEmailExists = null;

            Auth.createAccount(vm.registerAccount).then(function () {
                vm.success = 'OK';
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
    }
})();
