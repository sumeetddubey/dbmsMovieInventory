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
            setCurrentMovie: setCurrentMovie,
            performSearch: performSearch,
            purchaseMovie: purchaseMovie,
            getAllMoviesAdmin: getAllMoviesAdmin,
            getMoviesForPurchaseAdmin: getMoviesForPurchaseAdmin,
            addMovie: addMovie,
            updateMovie: updateMovie,
            deleteMovie: deleteMovie,
            addMovieForPurchase: addMovieForPurchase,
            updateMovieForPurchase: updateMovieForPurchase,
            deleteMovieForPurchase: deleteMovieForPurchase,
            getAllAwards: getAllAwards
        };
        return api;

        function getAllMoviesAdmin(){
            return $http.get('/api/admin/allMovies');
        }

        function addMovie(movie){
            return $http.post('/api/admin/addMovie', movie)
        }

        function addMovieForPurchase(movie){
            return $http.post('/api/admin/addMovieForPurchase', movie);
        }

        function updateMovie(movie){
            return $http.post('/api/admin/updateMovie',movie);
        }

        function deleteMovie(movieId){
            return $http.delete('/api/admin/deleteMovie/'+movieId);
        }

        function getMoviesForPurchaseAdmin(){
            return $http.get('/api/admin/moviesPurchase');
        }

        function updateMovieForPurchase(movie){
            return $http.post('/api/admin/updateMovieForPurchase', movie);
        }
        function deleteMovieForPurchase(movieId){
            return $http.delete('/api/admin/deleteMovieForPurchase/'+movieId);
        }

        function purchaseMovie(obj){
            return $http.post('/api/purchase', obj);
        }

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

        function performSearch(obj){
            return $http.post('/api/search', obj);
        }

        function getAllAwards(){
            return $http.get('/api/getAwards');
        }
    }
})();