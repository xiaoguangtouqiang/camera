(function () {
    'use strict';
    angular
        .module('cameraApp')
        .factory('ChunkFile', ChunkFile);

    ChunkFile.$inject = ['$resource'];

    function ChunkFile($resource) {
        var resourceUrl = 'api/image/upload';

        return $resource(resourceUrl, {}, {
            'remove': {method: 'DELETE'},
            'finish': {method: 'PUT', isArray: true}
        });
    }
})();
