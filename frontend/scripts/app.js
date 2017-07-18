/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("ProfcontactApp", [
    "ui.router",
    "oc.lazyLoad",
    "ngSanitize" ,
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

MetronicApp.factory("User",function(){
    var userData;
    return {
        set : function(data){
            userData = data;
        },
        get : function(){
            return userData;
        }
    }
});

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope','$http', function($scope, $rootScope,$http) {

}]);

MetronicApp.controller('HeaderController', ['$scope','$rootScope','$http','$state', function($scope,$rootScope,$http,$state,User) {

}]);
MetronicApp.factory('httpInterceptor', ['$q', '$rootScope',
    function ($q, $rootScope) {
        var loadingCount = 0;
        return {
            request: function (config) {
                ++loadingCount;
                if(loadingCount===1 && config.url==='/app/dashboard/getDashboard'){
                    angular.element(".page-spinner-bar").addClass('hide');
                }else if(loadingCount >= 1 && angular.element(".page-spinner-bar").hasClass('hide')){
                    angular.element(".page-spinner-bar").removeClass('hide');
                }
                return config || $q.when(config);
            },

            response: function (response) {
                if(--loadingCount === 0){
                  angular.element(".page-spinner-bar").addClass('hide');
                }
                return response || $q.when(response);
            },

            responseError: function (response) {
                if(--loadingCount === 0){
                    $rootScope.$broadcast('loading:finish');
                    angular.element(".page-spinner-bar").addClass('hide');
                 }
                return $q.reject(response);
            }
        };
    }
]);
MetronicApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
           url: "/home",
           templateUrl: 'view/home.html',
           data: {pageTitle: 'Главная'},
           resolve: {
               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                   return $ocLazyLoad.load({
                       name: 'ProfcontactApp',
                       insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                       files: [
                       ]
                   });
               }]
           }
        })
        .state('contacts', {
          url: "/contacts",
          templateUrl: 'view/contacts.html',
          data: {pageTitle: 'Контакты'},
          resolve: {
              deps: ['$ocLazyLoad', function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      name: 'ProfcontactApp',
                      insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                      files: [
                      'assets/global/plugins/fancybox/source/jquery.fancybox.pack.js',
                      'assets/global/plugins/uniform/jquery.uniform.min.js',
                      //'http://maps.google.com/maps/api/js?sensor=true',
                      //'assets/global/plugins/gmaps/gmaps.js',
                      'assets/frontend/pages/scripts/contact-us.js'
                      ]
                  });
              }]
          }
        })
        .state('service', {
          url: "/service",
          templateUrl: 'view/service/service.html',
          data: {pageTitle: 'Контакты'},
          resolve: {
              deps: ['$ocLazyLoad', function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      name: 'ProfcontactApp',
                      insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                      files: [

                      ]
                  });
              }]
          }
        })
        .state('service.inbound', {
          url: "/inbound",
          templateUrl: 'view/service/inbound.html',
          data: {pageTitle: 'Контакты'},
          resolve: {
              deps: ['$ocLazyLoad', function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      name: 'ProfcontactApp',
                      insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                      files: [

                      ]
                  });
              }]
          }
        })
}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope",  "$state", function($rootScope, $state) {
  console.log($state);
    $rootScope.$state = $state; // state to be accessed from view
}]);
