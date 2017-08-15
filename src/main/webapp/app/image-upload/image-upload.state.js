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
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/image-upload/upload.html',
                    controller: 'ImageUploadController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
