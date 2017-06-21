/**
 * Created by sumeetdubey on 6/21/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('PurchaseController', PurchaseController);

    function PurchaseController(MovieService){
        var vm=this;
        vm.currMovie=function(){
            MovieService.getCurrentMovie()
        }
    }
})();