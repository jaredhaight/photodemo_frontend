'use strict';

/* Controllers */
/*
function loginCtrl($scope, $cookieStore, $routeParams, $http, $location) {
    $scope.login = function() {
        var username = $scope.juser;
        var password = $scope.jpass;
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:8000/get-token/.api',
            data: {'username':username, 'password': password}
         }).success(function(data){
                var token = data.token;
                console.log(token);
                $cookieStore.put('token',token);
                $cookieStore.put('username', username);
                $location.path('/user/'+username);
            }).error(function(data){
                var error = data;
                console.log(error);
                $scope.alert = true;
                $scope.alertMessage = 'Invalid Credentials';
            });
    };
    $scope.alertClear = function(){
      $scope.alert = false;
    };

}
function logoutCtrl($scope, $cookieStore, $location) {
    $cookieStore.remove('token');
    $cookieStore.remove('username');
    $location.path('/login');
}
*/
function photoListCtrl($scope, photoClient, $routeParams, $http, $cookieStore, $cookies) {
    /*
    var token = $cookieStore.get('token');
    delete $http.defaults.headers.common['X-Requested-With'];
    $http.defaults.headers.common['Authorization'] = 'Token '+token;
    */
    delete $http.defaults.headers.common['X-Requested-With'];
    $scope.photos = photoClient.get();
    //$scope.rows = $scope.photos.results.split("", 3);
    $scope.photoGroup = [];
    $scope.select = function(obj) {
        if (obj.selected) {
            obj.selected = false;
            $scope.photoGroup.splice($scope.photoGroup.indexOf(obj),1);
            for (obj in $scope.photoGroup) {
                console.log(obj.title);
            }
        } else {
            obj.selected = true;
            $scope.photoGroup.push(obj);
            console.log($scope.photoGroup);
        };
    }
    $scope.uploadComplete = function (content, completed) {
        if (completed && content.length > 0) {
            $scope.response = JSON.parse(content);
            $scope.photos.results.push(JSON.parse(content));
            console.log('Completed: '+completed);
        } else {
            console.log('Upload FAILED!');
        };
    };

    $scope.deleteImages = function (photoGroup) {
        for (var i in photoGroup) {
            var photo = photoGroup[i];
            console.log('Photo: '+photo.id);
            var photoobj = new photoClient;
            photoobj.$delete({photoID: photo.id}, function() {
                $scope.photos.results.splice($scope.photos.results.indexOf(photo),1);
                $scope.photoGroup.splice($scope.photos.results.indexOf(photo),1);
            });
        };
    };

    $scope.editMode = false;
    $scope.photoLink= "href=/photo/{{photo.id}}";

    $scope.enableBulkEdit = function() {
        if ($scope.editMode) {
            $scope.editMode = false;
            $scope.photoLink= '"$location.path('/photo/' + photo.id)"';

        } else {
            $scope.editMode = true;
            $scope.photoLink = '"ng-click=select(photo)"';
        }
    }

    $scope.photoClick = function(photo){
        if($scope.editMode) {
            $scope.select(photo);
        } else {
            window.location = '/#/photo/'+photo.id;
        };
    };
};

function photoCtrl($scope, photoClient, $routeParams, $http, $cookieStore, $cookies) {
    /*
    var token = $cookieStore.get('token');
    delete $http.defaults.headers.common['X-Requested-With'];
    $http.defaults.headers.common['Authorization'] = 'Token '+token;
    */
    delete $http.defaults.headers.common['X-Requested-With'];
    $http.defaults.headers.common['Authorization'] = 'Token 06e1d3ec452a08021668531fd20f2ea98267d08a';
    $scope.photo = photoClient.get({photoID: $routeParams.photoID});
    //$scope.rows = $scope.photos.results.split("", 3);
}