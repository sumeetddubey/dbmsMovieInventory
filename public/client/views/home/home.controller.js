/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('HomeController', HomeController);

    function HomeController($location){
        var vm=this;

        vm.login=login;
        vm.viewMovies=viewMovies;
        vm.register=register;

        function login(){
            $location.url('/login');
        }

        function viewMovies(){
            $location.url('/viewMovies');
        }

        function register(){
            $location.url('/register');
        }
    }
})();