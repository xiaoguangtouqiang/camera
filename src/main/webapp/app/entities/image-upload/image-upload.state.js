(function () {
    'use strict';

    angular
        .module('cameraApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('image-upload', {
            parent: 'app',
            url: '/image-upload',
            data: {
                authorities: ['ROLE_USER']
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/image-upload/upload.html',
                    controller: 'ImageUploadController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
