/**
 * Created by sumeetdubey on 6/21/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('SearchController', SearchController);

    function SearchController(MovieService){
        var vm=this;
        vm.search={};
        vm.setSearchType=setSearchType;
        vm.performSearch=performSearch;

        function setSearchType(type){
            vm.search.type=type;
        }

        function performSearch(obj){
            MovieService.performSearch(obj)
                .then(
                    function(res){
                        vm.searchResults=res.data[0];
                        console.log(vm.searchResults);
                    }
                )
        }
        $('.dropdown-menu a').click(function(){
            $('#selected').text($(this).text());
        });

    }
})();