/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('RegisterController', RegisterController);

    function RegisterController(UserService, toastr){
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