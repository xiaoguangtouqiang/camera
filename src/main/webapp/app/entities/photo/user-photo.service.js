(function () {
    'use strict';
    angular
        .module('cameraApp')
        .factory('UserPhoto', UserPhoto);

    UserPhoto.$inject = ['$resource'];

    function UserPhoto($resource) {
        var resourceUrl = 'api/photos/user/current';

        return $resource(resourceUrl, {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                isArray: true
            },
            'update': {method: 'PUT'}
        });
    }
})();
