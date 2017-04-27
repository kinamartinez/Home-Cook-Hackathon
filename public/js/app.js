// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('meanMapApp', ['ui.router', 'addCtrl', 'queryCtrl', 'geolocation', 'gservice', 'foodController']);


// Configures Angular routing -- showing the relevant view and controller when needed.
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider

        .state('/find', {
            url: '/find',
            controller: 'queryCtrl',
            templateUrl: 'partials/queryForm.html',

            // All else forward to the Join Home Cook Team Control Panel
        })
        // Join Team Control Panel
        .state('/join', {
            url: '/join',
            controller: 'addCtrl',
            templateUrl: 'partials/addForm.html',

            // Find Home Cooks Control Panel
        })

        .state('/list', {
            url: '/list',
            controller: 'foodController',
            templateUrl: 'partials/list.html',

            // All else forward to the Join Home Cook Team Control Panel
        })

        .state('orderForm', {
            url: '/orderForm',
            controller: 'foodController',
            templateUrl: 'partials/orderForm.html',

            // All else forward to the Join Home Cook Team Control Panel
        })

        .state('auth', {
            url: '/auth/?token&name',
            controller: function($rootScope, $stateParams, $state, $http) {
                if ($stateParams.token) {
                    var user = {
                        name: $stateParams.name,
                        token: $stateParams.token
                    };
                    localStorage.setItem("user", JSON.stringify(user));
                    $rootScope.currentUser = user.name;
                    //set the header for all requests
                    $http.defaults.headers.common.Authorization = 'Bearer ' + user.token;
                    $state.go('home');
                }
            }
        });
    $urlRouterProvider.otherwise('/find');
}]);

app.run(function($rootScope) {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        $rootScope.currentUser = user.name;
    }
});