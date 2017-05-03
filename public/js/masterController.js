app.controller('masterController', function($scope, $rootScope, authFactory) {
    authFactory.getCurrentUser().then(function(data) {
        $rootScope.currentUser = data
    });
    $scope.logout = function() {
        authFactory.logout($rootScope.currentUser)
            .then(function(user) {
                $rootScope.currentUser = null;
                $state.go('home');
            }, function(err) {
                alert(err.data);
            });
    }
});