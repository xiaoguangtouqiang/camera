(function() {
    'use strict';

    angular
        .module('cameraApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('image-info', {
            parent: 'entity',
            url: '/image-info',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ImageInfos'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/image-info/image-infos.html',
                    controller: 'ImageInfoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('image-info-detail', {
            parent: 'entity',
            url: '/image-info/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ImageInfo'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/image-info/image-info-detail.html',
                    controller: 'ImageInfoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'ImageInfo', function($stateParams, ImageInfo) {
                    return ImageInfo.get({id : $stateParams.id});
                }]
            }
        })
        .state('image-info.new', {
            parent: 'image-info',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/image-info/image-info-dialog.html',
                    controller: 'ImageInfoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                path: null,
                                groupid: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('image-info', null, { reload: true });
                }, function() {
                    $state.go('image-info');
                });
            }]
        })
        .state('image-info.edit', {
            parent: 'image-info',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/image-info/image-info-dialog.html',
                    controller: 'ImageInfoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ImageInfo', function(ImageInfo) {
                            return ImageInfo.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('image-info', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('image-info.delete', {
            parent: 'image-info',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/image-info/image-info-delete-dialog.html',
                    controller: 'ImageInfoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ImageInfo', function(ImageInfo) {
                            return ImageInfo.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('image-info', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
