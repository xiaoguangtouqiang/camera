(function () {
    'use strict';

    angular
        .module('cameraApp')
        .controller('UserPostsController', UserPostsController);

    UserPostsController.$inject = ['Principal', 'paginationConstants', 'UserPhoto'];

    function UserPostsController(Principal, paginationConstants, UserPhoto) {
        var vm = this;
        vm.account = null;
        vm.page = 0;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.queryUserPhotos = queryUserPhotos;

        vm.queryUserPhotos();
        function queryUserPhotos() {
            UserPhoto.get({
                page: vm.page,
                size: vm.itemsPerPage
            }, function (data) {
                vm.photos = data;
            }, function (error) {
                alert("加载图片异常");
            });
        }
    }
})();
