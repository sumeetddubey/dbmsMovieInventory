/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('UserAccountController', UserAccountController);

    function UserAccountController(UserService, toastr){
        var vm=this;
        vm.togglePayment=togglePayment;
        vm.paySwitch=false;
        vm.updateUser=updateUser;
        vm.addPaymentMethod=addPaymentMethod;

        function addPaymentMethod(payment){
            var obj=payment;
            obj['user_id']=vm.user.user_id;
            UserService.addPaymentMethod(obj)
                .then(
                    function(doc){
                        console.log(doc);
                        toastr.success('Payment Method Added')
                    },
                    function(err){
                        toastr.error('There was an error')
                    }
                );
        }

        function updateUser(user){
            var obj=user;
            obj['user_id']=vm.user.user_id;
            UserService.updateUser(obj)
                .then(
                    function(doc){
                        toastr.success('Profile Updated')
                    },
                    function(err){
                        toastr.error('There was an error')
                    }
                )
        }

        function togglePayment(){
            vm.paySwitch=!(vm.paySwitch);
        }

        vm.user=UserService.getCurrentUser();

    }
})();