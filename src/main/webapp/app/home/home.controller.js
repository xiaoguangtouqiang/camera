(function() {
    'use strict';

    angular
        .module('cameraApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['Principal', 'LoginService', '$state'];

    function HomeController (Principal, LoginService, $state) {
        var vm = this;
        vm.account = null;
        vm.isAuthenticated = null;

    }
})();
