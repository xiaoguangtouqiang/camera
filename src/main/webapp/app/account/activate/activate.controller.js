(function () {
    'use strict';

    angular
        .module('cameraApp')
        .controller('ActivationController', ActivationController);

    ActivationController.$inject = ['$stateParams', '$uibModalInstance', 'ActivateService'];

    function ActivationController($stateParams, $uibModalInstance, ActivateService) {
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
            ActivateService.save({activationKey: $stateParams.key, login: vm.registerAccount.login},function(){
                console.log("账号激活成功");
            })
        }

    }
})();
