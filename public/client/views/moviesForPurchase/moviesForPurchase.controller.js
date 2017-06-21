/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('MoviesForPurchaseController', MoviesForPurchaseController);

    function MoviesForPurchaseController(MovieService, $location){
        var vm=this;
        vm.loadMore=loadMore;

        vm.getMoviesForPurchase=getMoviesForPurchase;
        vm.buyMovie=buyMovie;

        function buyMovie(movie){
            MovieService.setCurrentMovie(movie);
            $location.url('/purchase')
        }

        function getMoviesForPurchase(){
            MovieService.getMoviesForPurchase()
                .then(function(res){
                        vm.movies=res.data;
                        vm.currentMovies=vm.movies.slice(0, 100);
                    },
                    function(err){
                        console.log(err);
                    })
        }

        getMoviesForPurchase();

        function loadMore(){
            if(vm.currentMovies) {
                var last = vm.currentMovies.length - 1;
                console.log(last);
                for (var i = 1; i <= 100; i++) {
                    vm.currentMovies.push(vm.movies[last + i]);
                }
            }
        }
    }
})();