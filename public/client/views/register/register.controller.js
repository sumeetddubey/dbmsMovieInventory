/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('RegisterController', RegisterController);

    function RegisterController(UserService, $location, toastr){
        var vm=this;
        vm.register=register;

        function register(user){
            if(!user.username || !user.password || !user.email){
                toastr.error('Please fill all required fields');
            }
            else{
                if(user.username=='' || user.password=='' || user.email==''){
                    toastr.error('Please fill all required fields');
                }
                else{
                    UserService.register(user)
                        .then(
                            function(res){
                                toastr.success('Success!');
                                UserService.login(user)
                                    .then(function (res){
                                        UserService.setCurrentUser(res);
                                        console.log(res);
                                        $location.url('/userHomepage');
                                    })
                            },
                            function(err){
                                if(err.data.errno===1062){
                                    toastr.error('Sorry that username is taken!');
                                }
                            }
                        )
                }
            }
        }
    }
})();