(function () {
    'use strict';

    angular
        .module('cameraApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('activate', {
            parent: 'app',
            url: '/activate?key',
            data: {
                authorities: [],
                pageTitle: '账户激活'
            },
            views: {
                'content@': {
                    templateUrl: 'app/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                }
            },
            onEnter: ['$uibModal', '$state', '$stateParams', function ($uibModal, $state, $stateParams) {
                $uibModal.open({
                    templateUrl: 'app/account/activate/activate.html',
                    controller: 'ActivationController',
                    controllerAs: 'vm',
                    size: 'md'
                }).result.then(function (data) {
                    $state.go('^');
                }, function () {
                    $state.go('^');
                });
            }]
        });
    }
})();
