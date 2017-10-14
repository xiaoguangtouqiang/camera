(function () {
    'use strict';

    angular
        .module('cameraApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('user-posts', {
            parent: 'app',
            url: '/user-posts',
            data: {
                authorities: ['ROLE_USER']
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-posts/user-posts.html',
                    controller: 'UserPostsController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
