/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app=angular.module('movieApp', ['ngRoute', 'toastr', 'infinite-scroll']);
    app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
})();
