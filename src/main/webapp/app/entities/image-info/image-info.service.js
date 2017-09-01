(function() {
    'use strict';
    angular
        .module('cameraApp')
        .factory('ImageInfo', ImageInfo);

    ImageInfo.$inject = ['$resource'];

    function ImageInfo ($resource) {
        var resourceUrl =  'api/image-infos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
