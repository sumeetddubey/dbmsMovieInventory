/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('LoginController', LoginController);

    function LoginController(UserService, toastr, $location){
        var vm=this;

        vm.login=login;
        vm.checkAdmin=false;

        vm.setAdmin=function(){
            vm.checkAdmin=true
        };

        vm.setUser=function(){
            vm.checkAdmin=false;
        };

        function login(user){
            if (vm.checkAdmin===true){
                UserService.checkAdmin(user)
                    .then(
                        function(res){
                            var checkStr="check_admin('" +user.username+"')";
                            var check=res.data[0][checkStr];
                            if(check===1){
                                UserService.setAdmin();
                            }
                            else if (check===0){
                                toastr.error('Could not identify account as admin')
                            }
                        },
                        function(err){
                            console.log(err)
                        }
                    )
            }
            UserService.login(user)
                .then(function (res){
                    UserService.setCurrentUser(res);
                    if(vm.checkAdmin){
                        if(UserService.getAdmin()){
                            $location.url('/admin')
                        }
                    }

                    else{
                        $location.url('/userHomepage');
                    }

                },
                function(err){
                    if(err.data==='nf'){
                        toastr.error('Invalid username or password');
                    }
                })
        }
    }
})();