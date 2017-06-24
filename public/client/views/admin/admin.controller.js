/**
 * Created by sumeetdubey on 6/22/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('AdminController', AdminController);

    function AdminController(UserService, MovieService, toastr, $location){
        var vm=this;

        vm.addUser=addUser;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;
        vm.addMovie=addMovie;
        vm.addMovieForPurchase=addMovieForPurchase;
        vm.updateMovie=updateMovie;
        vm.deleteMovie=deleteMovie;
        vm.updateMovieForPurchase=updateMovieForPurchase;
        vm.deleteMovieForPurchase=deleteMovieForPurchase;
        vm.loadMoreMovies=loadMoreMovies;
        vm.logout=logout;

        vm.userViewFlag=false;
        vm.moviesAllViewFlag=false;
        vm.moviesPurchasedViewFlag=false;

        vm.userView=function(){
            vm.moviesAllViewFlag=false;
            vm.moviesPurchaseViewFlag=false;
            vm.userViewFlag=true;
            vm.users={};
            getAllUsers();
        };
        vm.moviesAllView=function(){
            vm.moviesAllViewFlag=true;
            vm.moviesPurchasedViewFlag=false;
            vm.userViewFlag=false;
            vm.movies={};
            getAllMovies();
        };
        vm.moviesPurchaseView=function(){
            vm.moviesAllViewFlag=false;
            vm.moviesPurchaseViewFlag=true;
            vm.userViewFlag=false;
            vm.movies={};
            getMoviesForPurchase();
        };


        function getAllMovies(){
            MovieService.getAllMoviesAdmin()
                .then(
                    function (doc) {
                        vm.movies = doc.data;
                        vm.currentMovies=vm.movies.slice(0, 100);
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function getMoviesForPurchase(){
            MovieService.getMoviesForPurchaseAdmin()
                .then(
                    function (doc) {
                        vm.movies = doc.data;
                        vm.currentMovies=vm.movies.slice(0, 100);
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function getAllUsers() {
            UserService.getAllUsers()
                .then(
                    function (doc) {
                        vm.users = doc.data;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function addUser(user){
            UserService.addUser(user)
                .then(
                    function(doc){
                        toastr.success('User added');
                        getAllUsers();
                    },
                    function(err){
                        toastr.error('There was an error ' +err.data.code +'\nError Code: ' +err.data.errno)
                    }
                )
        }

        function updateUser(user){
            UserService.updateUser(user)
                .then(
                    function(doc){
                        toastr.success('User Updated')
                    },
                    function(err){
                        toastr.error('There was an error ' +err.data.code +'\nError Code: ' +err.data.errno)
                    }
                )
        }

        function deleteUser(user){
            UserService.deleteUser(user)
                .then(
                    function(doc){
                        toastr.success('User Deleted');
                        getAllUsers();
                    },
                    function(err){
                        console.log(err);
                        toastr.error('There was an error ' +err.data.code +'\nError Code: ' +err.data.errno)
                    }
                )
        }

        function addMovie(movie){
            console.log(movie);
            MovieService.addMovie(movie)
                .then(
                    function(doc){
                        toastr.success('Movie added');
                        getAllMovies();
                    },
                    function(err){
                        toastr.error('There was an error ' +err.data.code +'\nError Code: ' +err.data.errno)
                    }
            )
        }

        function updateMovie(movie){
            MovieService.updateMovie(movie)
                .then(
                    function(doc){
                        toastr.success('Movie Updated')
                    },
                    function(err){
                        toastr.error('There was an error ' +err.data.code +'\nError Code: ' +err.data.errno)
                    }
                )
        }

        function deleteMovie(movie){
            MovieService.deleteMovie(movie.movie_id)
                .then(
                    function(doc){
                        toastr.success('Movie removed');
                        getAllMovies();
                    },
                    function(err){
                        toastr.error('There was an error ' +err.data.code +'\nError Code: ' +err.data.errno)
                    }
                )
        }

        function addMovieForPurchase(movie){
            console.log(movie);
            MovieService.addMovieForPurchase(movie)
                .then(
                    function(doc){
                        toastr.success('Movie added for purchase');
                        getMoviesForPurchase();
                    },
                    function(err){
                        toastr.error('There was an error ' +err.data.code +'\nError Code: ' +err.data.errno)
                    }
                )
        }

        function updateMovieForPurchase(movie){
            MovieService.updateMovieForPurchase(movie)
                .then(
                    function(doc){
                        toastr.success('Movie for purchase Updated')
                    },
                    function(err){
                        toastr.error('There was an error ' +err.data.code +'\nError Code: ' +err.data.errno)
                    }
                )
        }

        function deleteMovieForPurchase(movie){
            MovieService.deleteMovieForPurchase(movie.entry_id)
                .then(
                    function(doc){
                        toastr.success('Movie for purchase removed');
                        getMoviesForPurchase();
                    },
                    function(err){
                        toastr.error('There was an error: ' +err.data.code +'\n Error Code: ' +err.data.errno)
                    }
                )
        }

        function loadMoreMovies(){
            if(vm.currentMovies) {
                var last = vm.currentMovies.length - 1;
                for (var i = 1; i <= 100; i++) {
                    vm.currentMovies.push(vm.movies[last + i]);
                }
            }
        }

        function logout(){
            UserService.logout();
            $location.url('/')
        }
    }
})();