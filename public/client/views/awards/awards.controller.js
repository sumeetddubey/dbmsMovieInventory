/**
 * Created by sumeetdubey on 6/22/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('AwardsController', AwardsController);

    function AwardsController(MovieService){
        var vm=this;

        vm.loadMore=loadMore;
        vm.performSearch=performSearch;
        vm.getAllAwards=getAllAwards;

        function getAllAwards(){
            MovieService.getAllAwards()
                .then(
                    function(res){
                        vm.searchResults=res.data;
                        vm.currentMovies=vm.searchResults.slice(0, 100);
                    },
                    function(err){
                        console.log(err);
                    }
                )
        }

        getAllAwards();

        function performSearch(obj){
            obj.type='academy';
            MovieService.performSearch(obj)
                .then(
                    function(res){
                        vm.searchResults=res.data[0];
                        vm.currentMovies=vm.searchResults.slice(0, 100);
                    },
                    function(err){
                        console.log(err);
                    }
                )
        }

        function loadMore(){
            if(vm.currentMovies) {
                var last = vm.currentMovies.length - 1;
                for (var i = 1; i <= 100; i++) {
                    vm.currentMovies.push(vm.searchResults[last + i]);
                }
            }
        }
    }
})();