/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('MainController', MainController);

    function MainController($location){
        var vm=this;
        vm.home=home;

        function home(){
            $location.url('/')
        }
    }
})();