/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app = angular.module('movieApp');
    app.factory('MovieService', MovieService);

    function MovieService($http, $rootScope){

        var api = {
            getAllMovies: getAllMovies,
            getMoviesForPurchase: getMoviesForPurchase,
            getCurrentMovie: getCurrentMovie,
            setCurrentMovie: setCurrentMovie
        };
        return api;

        function getCurrentMovie(){
            return $rootScope.currMovie;
        }

        function setCurrentMovie(movie){
            $rootScope.currMovie=movie;
        }

        function getAllMovies() {
            return $http.get('/api/getAllMovies');
        }

        function getMoviesForPurchase(){
            return $http.get('/api/getMoviesForPurchase');
        }
    }
})();