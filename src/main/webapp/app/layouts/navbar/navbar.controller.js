(function () {
    'use strict';

    angular
        .module('cameraApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope','$state', 'Auth', 'Principal', 'ProfileService', 'LoginService', 'RegisterService'];

    function NavbarController($scope,$state, Auth, Principal, ProfileService, LoginService, RegisterService) {
        var vm = this;
        vm.isAuthenticated = Principal.isAuthenticated();

        ProfileService.getProfileInfo().then(function (response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });
        vm.getAccount = getAccount;
        vm.login = login;
        vm.register = register;
        vm.logout = logout;
        vm.$state = $state;
        vm.getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated();
            });
        }

        function login() {
            LoginService.open();
        }

        function register() {
            RegisterService.open();
        }

        function logout() {
            Auth.logout();
            $state.go('home', null, {reload: true});
        }

        $scope.$on("authenticationSuccess",function(){
            $state.go('home', null, {reload: true});
        })
    }
})();
