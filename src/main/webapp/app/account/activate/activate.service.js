(function () {
    'use strict';

    angular
        .module('cameraApp')
        .factory('ActivateService', ActivateService);

    ActivateService.$inject = ['$resource'];

    function ActivateService($resource) {
        var service = $resource('api/account/activate/:key', {}, {});
        return service;
    }
})();
