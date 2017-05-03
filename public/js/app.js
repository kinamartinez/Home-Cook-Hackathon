// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('meanMapApp', [
    'ui.router',
    'addCtrl',
    'queryCtrl',
    'geolocation',
    'gservice',
    'foodController'

    // 'auth0.lock',
    // 'angular-jwt',
    // 'angular-storage',
    // 'ngMaterial',
    // 'auth0',
    // 'profileController',
    // 'toolbarController'
]);


// Configures Angular routing -- showing the relevant view and controller when needed.
//'authProvider','$httpProvider', 'jwtInterceptorProvider',
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$provide',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
        // Join Team Control Panel
            .state('map.join', {
            url: '/join',
            controller: 'authCtrl',
            templateUrl: 'partials/addForm.html',

            // Find Home Cooks Control Panel
        })

        .state('map.list', {
                url: '/list',
                templateUrl: 'partials/list.html',
                controller: 'foodController'
                    // All else forward to the Join Home Cook Team Control Panel
            })
            .state('profile', {
                url: '/profile',
                controller: 'foodController',
                templateUrl: 'partials/profile.html',
                // All else forward to the Join Home Cook Team Control Panel
            })
            .state('profile.reviewForm', {
                url: '/reviewForm',
                templateUrl: 'partials/reviewForm.html',
                controller: 'foodController'
                    // All else forward to the Join Home Cook Team Control Panel
            })
            .state('orderForm', {
                url: '/orderForm',
                controller: 'foodController',
                templateUrl: 'partials/orderForm.html',

                // All else forward to the Join Home Cook Team Control Panel
            })
            .state('home', {
                url: '/home',
                templateUrl: 'js/components/home/home.tpl.html',
            })

        .state('map', {
                url: '/map',
                templateUrl: 'partials/map.html',
                controller: 'queryCtrl'
            })
            .state('map.find', {
                url: '/find',
                templateUrl: 'partials/queryForm.html',
                controller: 'authCtrl'
                    // All else forward to the Join Home Cook Team Control Panel
            })
            .state('register', {
                url: '/register',
                templateUrl: '/partials/userRegistration.html',
                controller: 'authCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/partials/login.html',
                controller: 'authCtrl'
            })
            .state('account', {
                url: '/myAccount',
                templateUrl: '/partials/account.html',
                controller: 'accountCtrl',
                resolve: {
                    myData: function($http, $state) {
                        console.log('yup')
                        return $http.get('/account/updateProfile')
                            .catch(function(err) {
                                console.log('yes i am')
                                $state.go('home')
                            })
                    }
                }
            });
        // lockProvider.init({
        //     clientID: '55GqM7lzjXdbdFhkBlb7BSUQY2IvRUVk',
        //     domain: 'kinamartinez.eu.auth0.com',
        //     options: {
        //         _idTokenVerification: false
        //     }
        // });

        $urlRouterProvider.otherwise('/home');
    }
]);