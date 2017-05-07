app.controller('accountCtrl', function($scope, myData, $state, $rootScope ) {
    console.log(myData.data);
    $scope.user = myData.data

});