/**
 * Created by sumeetdubey on 6/21/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.controller('PurchaseController', PurchaseController);

    function PurchaseController(UserService, MovieService, toastr, $location){
        var vm=this;
        vm.purchase={};
        vm.user={};
        vm.setQuality=setQuality;
        vm.selectPaymentMethod=selectPaymentMethod;
        vm.purchaseMovie=purchaseMovie;

        vm.userAccount=function(){
            $location.url('/userAccount')
        };

        function purchaseMovie(){
            var obj={
                'movie': vm.currMovie,
                'user': vm.user,
                'purchase': vm.purchase
            };
            console.log(vm.currMovie, vm.user, vm.purchase);
            MovieService.purchaseMovie(obj)
                .then(
                    function(doc){
                        toastr.success('Movie Purchased!');
                        $location.url('/userHomepage');
                    },
                    function(err){
                        if(err.status===400){
                            if(err.data.errno===1062){
                                toastr.error('You have purchased this movie already!');
                            }
                        }
                        else{
                            console.log(err);
                        }
                    }
                )
        }

        function setQuality(val){
            vm.purchase.quality=val;
            vm.purchase.price= vm.currMovie.price[vm.currMovie.quality.indexOf(vm.purchase.quality)];

        }

        function getPaymentDetails(){
            UserService.getPaymentDetails()
                .then(
                    function(doc){
                        vm.user.paymentMethods=doc.data[0];
                    },
                    function(err){
                        console.log(err);
                    }
                )
        }
        getPaymentDetails();

        vm.currMovie=MovieService.getCurrentMovie();
        vm.currMovie.quality=vm.currMovie.quality.split(',');
        vm.currMovie.price=vm.currMovie.price.split(',');

        function selectPaymentMethod(val){
            vm.user.card=val;
        }
    }
})();