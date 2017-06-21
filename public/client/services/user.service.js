/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app = angular.module('movieApp');
    app.factory('UserService', UserService);

    function UserService($http, $rootScope){

        var api = {
            login: login,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            register: register
        };
        return api;

        function login(user) {
            return $http.post('/api/login', user);
        }

        function register(user){
            return $http.post('/api/register', user);
        }

        function getCurrentUser(){
            return $rootScope.currUser
        }

        function setCurrentUser(res){
            $rootScope.currUser=res.data[0];
        }
    }
})();