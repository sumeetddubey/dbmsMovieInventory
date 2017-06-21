/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('UserHomepageController', UserHomepageController);

    function UserHomepageController($location, UserService){
        var vm=this;

        vm.currUser=UserService.getCurrentUser();
        vm.viewMovies=viewMovies;
        vm.register=register;
        vm.moviesForPurchase=moviesForPurchase;

        function moviesForPurchase(){
            $location.url('/moviesForPurchase');
        }

        function viewMovies(){
            $location.url('/viewMovies');
        }

        function register(){
            $location.url('/register');
        }
    }
})();