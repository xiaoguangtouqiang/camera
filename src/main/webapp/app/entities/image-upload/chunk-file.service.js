(function () {
    'use strict';
    angular
        .module('cameraApp')
        .factory('ChunkFile', ChunkFile);

    ChunkFile.$inject = ['$resource'];

    function ChunkFile($resource) {
        var resourceUrl = 'api/file/upload/chunk';

        return $resource(resourceUrl, {}, {
            'remove': {method: 'DELETE'},
            'finish': {method: 'PUT', isArray: true}
        });
    }
})();
