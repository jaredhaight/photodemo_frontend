'use strict';

// Declare app level module which depends on filters, and services
angular.module('patjs', ['patjs.filters', 'patjs.directives','patSvc', 'ngCookies', 'ngUpload']).
  config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider.when('/photos', {templateUrl: 'partials/photos.html', controller: photoListCtrl});
    $routeProvider.when('/photo/:photoID', {templateUrl: 'partials/photo.html', controller: photoCtrl});
    $routeProvider.when('/upload', {templateUrl: 'partials/upload.html', controller: photoListCtrl});
    $routeProvider.otherwise({redirectTo: '/photos'});
  }]);
