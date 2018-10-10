'use strict';

angular.module('app')

.config( function ($stateProvider,   $urlRouterProvider, $locationProvider) {  
  // $locationProvider.html5Mode(true); 
  $urlRouterProvider.otherwise('/app/home');
      
  $stateProvider
  .state('login', {
    url: '/login',
    controller:'LoginCtrl',
    templateUrl: 'tpl/login.html' ,
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/login.js']);
      }]
    } 
  })
  .state('app', {
    abstract: true,
    url: '/app',
    controller:'NavCtrl',
    templateUrl: 'tpl/app.html'
  })
  .state('app.home', {
    url: '/home',
    controller:'NavCtrl',
    templateUrl: 'tpl/home.html'
  })
  //slides
  .state('app.slides', {
    url: '/slides',
    controller:'slidesCtrl',
    templateUrl: 'tpl/slides/list.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/slides/list.js']);
      }]
    }
  })
  .state('app.slide', {
    url: '/slide/:id',
    controller:'EditSlideCtrl',
    templateUrl: 'tpl/slides/edit.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/slides/edit.js']);
      }]
    }
  })
  .state('app.addSlide', {
    url: '/add-slide',
    controller:'AddSlideCtrl',
    templateUrl: 'tpl/slides/add.html',
    resolve: {
      deps: ['$ocLazyLoad',function ($ocLazyLoad){
        return $ocLazyLoad.load('textAngular').then(function(){
          return $ocLazyLoad.load('js/controllers/slides/add.js');
        });
      }]
    }
  })
  .state('app.video', {
    url: '/video/:id',
    controller:'EditVideoCtrl',
    templateUrl: 'tpl/slides/editVideo.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/slides/editVideo.js']);
      }]
    }
  })
  //store
  .state('app.stores', {
    url: '/stores',
    controller:'StoresCtrl',
    templateUrl: 'tpl/stores/list.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/stores/list.js']);
      }]
    }
  })
  .state('app.store', {
    url: '/store/:id',
    controller:'EditStoreCtrl',
    templateUrl: 'tpl/stores/edit.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/stores/edit.js']);
      }]
    }
  })
  .state('app.addStore', {
    url: '/add-store',
    controller:'AddStoreCtrl',
    templateUrl: 'tpl/stores/add.html',
    resolve: {
      deps: ['$ocLazyLoad',function ($ocLazyLoad){
        return $ocLazyLoad.load('textAngular').then(function(){
          return $ocLazyLoad.load('js/controllers/stores/add.js');
        });
      }]
    }
  })
  //models
  .state('app.models', {
    url: '/models',
    controller:'ModelsCtrl',
    templateUrl: 'tpl/models/list.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/models/list.js']);
      }]
    }
  })
  .state('app.model', {
    url: '/model/:id',
    controller:'EditModelCtrl',
    templateUrl: 'tpl/models/edit.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/models/edit.js']);
      }]
    }
  })
  //orders
  .state('app.orders', {
    url: '/orders',
    controller:'OrdersCtrl',
    templateUrl: 'tpl/orders/list.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/orders/list.js']);
      }]
    }
  })
  .state('app.order', {
    url: '/order/:id',
    controller:'EditOrderCtrl',
    templateUrl: 'tpl/orders/edit.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/orders/edit.js']);
      }]
    }
  })
  //users
  .state('app.users', {
    url: '/users',
    controller:'usersCtrl',
    templateUrl: 'tpl/users/list.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/users/list.js']);
      }]
    }
  })
  .state('app.user', {
    url: '/user/:id',
    controller:'EditUserCtrl',
    templateUrl: 'tpl/users/edit.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/users/edit.js']);
      }]
    }
  })
  //albums
  .state('app.albums', {
    url: '/albums',
    controller:'AlbumsCtrl',
    templateUrl: 'tpl/albums/list.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/albums/list.js']);
      }]
    }
  })
  .state('app.album', {
    url: '/album/:id',
    controller:'EditAlbumCtrl',
    templateUrl: 'tpl/albums/edit.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/albums/edit.js']);
      }]
    }
  })
  .state('app.addAlbum', {
    url: '/add-album',
    controller:'AddAlbumCtrl',
    templateUrl: 'tpl/albums/add.html',
    resolve: {
      deps: ['$ocLazyLoad',function ($ocLazyLoad){
        return $ocLazyLoad.load('textAngular').then(function(){
          return $ocLazyLoad.load('js/controllers/albums/add.js');
        });
      }]
    }
  })
  //#GodIsGood
  .state('app.gisgs', {
    url: '/GodIsGoods',
    controller:'GisGCtrl',
    templateUrl: 'tpl/godisgood/list.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/godisgood/list.js']);
      }]
    }
  })
  .state('app.gisg', {
    url: '/GodIsGood/:id',
    controller:'EditGisGCtrl',
    templateUrl: 'tpl/godisgood/edit.html',
    resolve: {
      deps: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load(['js/controllers/godisgood/edit.js']);
      }]
    }
  })
  .state('app.Addgisg', {
    url: '/add-GodIsGood',
    controller:'AddGisGCtrl',
    templateUrl: 'tpl/godisgood/add.html',
    resolve: {
      deps: ['$ocLazyLoad',function ($ocLazyLoad){
        return $ocLazyLoad.load('textAngular').then(function(){
          return $ocLazyLoad.load('js/controllers/godisgood/add.js');
        });
      }]
    }
  })

});