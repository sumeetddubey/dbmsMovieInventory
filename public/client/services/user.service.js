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
            register: register,
            getPaymentDetails: getPaymentDetails,
            getUserMovies: getUserMovies,
            addPaymentMethod: addPaymentMethod,
            checkAdmin: checkAdmin,
            getAdmin: getAdmin,
            setAdmin: setAdmin,
            getAllUsers: getAllUsers,
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            logout: logout
        };
        return api;


        function addUser(user){
            return $http.post('api/admin/addUser', user);
        }

        function deleteUser(user){
            return $http.delete('/api/deleteUser/'+user.user_id);
        }

        function getAllUsers(){
            return $http.get('api/allUsers');
        }

        function getAdmin(){
            return $rootScope.admin;
        }

        function setAdmin(){
            $rootScope.admin=true;
        }

        function checkAdmin(user){
            return $http.post('/api/checkAdmin', user);
        }

        function addPaymentMethod(obj){
            return $http.post('/api/addPaymentMethod', obj)
        }

        function updateUser(user){
            return $http.post('/api/updateUser', user);
        }

        function getUserMovies(){
            var user=getCurrentUser();
            return $http.post('/api/userMovies', user);
        }

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

        function getPaymentDetails(){
            var user=getCurrentUser();
            return $http.post('/api/paymentDetails', user);
        }

        function logout(){
            $rootScope.currUser=null;
            $rootScope.admin=false;
        }
    }
})();