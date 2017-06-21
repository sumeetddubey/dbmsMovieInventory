/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('LoginController', LoginController);

    function LoginController(UserService, toastr, $location){
        var vm=this;

        vm.login=login;

        function login(user){
            UserService.login(user)
                .then(function (res){
                    UserService.setCurrentUser(res);
                    $location.url('/userHomepage');
                },
                function(err){
                    if(err.data==='nf'){
                        toastr.error('Invalid username or password');
                    }
                })
        }
    }
})();