/**
 * Created by sumeetdubey on 6/20/17.
 */
(function(){
    var app=angular.module('movieApp');
    app.config(function($routeProvider){

        $routeProvider
            .when('/', {
                templateUrl:'client/views/home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl:'client/views/login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl:'client/views/register/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when('/viewMovies', {
                templateUrl:'client/views/viewMovies/viewMovies.view.html',
                controller: 'ViewMoviesController',
                controllerAs: 'model'
            })
            .when('/moviesForPurchase', {
                templateUrl:'client/views/moviesForPurchase/moviesForPurchase.view.html',
                controller: 'MoviesForPurchaseController',
                controllerAs: 'model'
            })
            .when('/userHomepage', {
                templateUrl:'client/views/userHomepage/userHomepage.view.html',
                controller:'UserHomepageController',
                controllerAs:'model'
            })
            .when('/purchase', {
                templateUrl:'client/views/purchase/purchase.view.html',
                controller:'PurchaseController',
                controllerAs:'model'
            })
            .when('/search', {
                templateUrl:'client/views/search/search.view.html',
                controller:'SearchController',
                controllerAs:'model'
            })
            .when('/userAccount', {
                templateUrl:'client/views/userAccount/userAccount.view.html',
                controller:'UserAccountController',
                controllerAs:'model'
            })
            .when('/admin', {
                templateUrl:'client/views/admin/admin.view.html',
                controller:'AdminController',
                controllerAs:'model'
            })
            .when('/awards', {
                templateUrl:'client/views/awards/awards.view.html',
                controller:'AwardsController',
                controllerAs:'model'
            })
    })
})();