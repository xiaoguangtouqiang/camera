(function() {
    'use strict';

    angular
        .module('cameraApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('photo', {
            parent: 'entity',
            url: '/photo',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Photos'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/photo/photos.html',
                    controller: 'PhotoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('photo-detail', {
            parent: 'photo',
            url: '/photo/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Photo'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/photo/photo-detail.html',
                    controller: 'PhotoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Photo', function($stateParams, Photo) {
                    return Photo.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'photo',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('photo-detail.edit', {
            parent: 'photo-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/photo/photo-dialog.html',
                    controller: 'PhotoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Photo', function(Photo) {
                            return Photo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('photo.new', {
            parent: 'photo',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/photo/photo-dialog.html',
                    controller: 'PhotoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                title: null,
                                description: null,
                                tags: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('photo', null, { reload: 'photo' });
                }, function() {
                    $state.go('photo');
                });
            }]
        })
        .state('photo.edit', {
            parent: 'photo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/photo/photo-dialog.html',
                    controller: 'PhotoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Photo', function(Photo) {
                            return Photo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('photo', null, { reload: 'photo' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('photo.delete', {
            parent: 'photo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/photo/photo-delete-dialog.html',
                    controller: 'PhotoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Photo', function(Photo) {
                            return Photo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('photo', null, { reload: 'photo' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
