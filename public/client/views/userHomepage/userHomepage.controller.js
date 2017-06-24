/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('UserHomepageController', UserHomepageController);

    function UserHomepageController($location, UserService){
        var vm=this;

        vm.currUser=UserService.getCurrentUser();
        vm.awards=awards;
        vm.search=search;
        vm.moviesForPurchase=moviesForPurchase;
        vm.getUserMovies=getUserMovies;
        vm.accountSettings=accountSettings;
        vm.logout=logout;

        getUserMovies();

        function moviesForPurchase(){
            $location.url('/moviesForPurchase');
        }

        function awards(){
            $location.url('/awards');
        }

        function search(){
            $location.url('/search');
        }

        function getUserMovies(){
            UserService.getUserMovies()
                .then(
                    function(doc){
                        vm.userMovies=doc.data[0];
                    },
                    function(err){
                        console.log(err);
                    }
                )
        }

        function accountSettings(){
            $location.url('/userAccount');
        }

        function logout(){
            UserService.logout();
            $location.url('/');
        }
    }
})();