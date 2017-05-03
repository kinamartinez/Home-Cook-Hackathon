app.controller('masterController', function($rootScope, authFactory) {
    authFactory.getCurrentUser().then(function(data) {
        $rootScope.currentUser = data
    })
});