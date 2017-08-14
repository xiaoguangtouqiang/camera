(function () {
    'use strict';

    angular
        .module('cameraApp')
        .factory('RegisterService', RegisterService);

    RegisterService.$inject = ['$uibModal', 'LoginService'];

    function RegisterService($uibModal, LoginService) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open() {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/account/register/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            });
            modalInstance.result.then(function (data) {
                    console.log("data:" + data);
                    modalInstance = null;
                    LoginService.open(data);
                },
                resetModal
            );
        }
    }
})();
