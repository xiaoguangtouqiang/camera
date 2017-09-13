(function () {
    'use strict';

    angular
        .module('cameraApp')
        .controller('ActivationController', ActivationController);

    ActivationController.$inject = ['$timeout', '$stateParams', '$uibModalInstance', 'ActivateService', 'AlertService'];

    function ActivationController($timeout, $stateParams, $uibModalInstance, ActivateService, AlertService) {
        var vm = this;
        vm.cancel = cancel;
        vm.active = active;
        ActivateService.get({key: $stateParams.key}, function (data) {
            vm.registerEmail = data.email;
        }, function (error) {
            vm.error = 'ERROR';
            vm.errormsg = error.data.message;
        });

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function active() {
            ActivateService.save({activationKey: $stateParams.key, login: vm.registerAccount.login}, function () {
                AlertService.success("账户激活成功，即将跳转到登录页面");
                $timeout(function () {
                    $uibModalInstance.close(vm.registerAccount.login);
                }, 2000);
            }, function (error) {
                AlertService.error(error);
            })
        }
    }
})();
