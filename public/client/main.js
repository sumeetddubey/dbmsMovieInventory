/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('MainController', MainController);

    function MainController($location, $rootScope){
        var vm=this;
        vm.home=home;
        vm.inHomePage=function(){
            return ($location.path()=== '/');
        }

        $rootScope.admin=false;

        function home(){
            $location.url('/')
        }
    }
})();