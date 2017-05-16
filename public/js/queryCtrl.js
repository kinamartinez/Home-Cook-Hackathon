// Creates the addCtrl Module and Controller. Note that it depends on 'geolocation' and 'gservice' modules.
angular.module('queryCtrl', ['geolocation', 'gservice'])
    .controller('queryCtrl', function($scope, $log, $http, $rootScope, geolocation, gservice) {

        // Initializes Variables
        // ----------------------------------------------------------------------------
        $scope.formData = {};
        var queryBody = {};


        // Functions
        // ----------------------------------------------------------------------------

        // Get User's actual coordinates based on HTML5 at window load
        geolocation.getLocation().then(function(data) {
            coords = { lat: data.coords.latitude, long: data.coords.longitude };

            // Set the latitude and longitude equal to the coordinates
            $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
            $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
        });

        // Get coordinates based on mouse click. When a click event is detected....
        $rootScope.$on("clicked", function() {

            // Run the gservice functions associated with identifying coordinates
            $scope.$apply(function() {
                $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
                $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            });
        });

        // Take query parameters and incorporate into a JSON queryBody
        $scope.queryUsers = function() {

            // Assemble Query Body
            queryBody = {
                longitude: parseFloat($scope.formData.longitude),
                latitude: parseFloat($scope.formData.latitude),
                distance: parseFloat($scope.formData.distance),
                favlang: $scope.formData.favlang,
                reqVerified: $scope.formData.verified,
                cook: true

            };

            // Post the queryBody to the /query POST route to retrieve the filtered results
            $http.post('/query/', queryBody)

            // Store the filtered results in queryResults
                .success(function(queryResults) {

                    // Query Body and Result Logging
                    // console.log("QueryBody:");
                    // console.log(queryBody);
                    // console.log("QueryResults:");
                    // console.log(queryResults);
                    // Pass the filtered results to the Google Map Service and refresh the map
                    gservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);

                    // Count the number of records retrieved for the panel-footer
                    $scope.queryCount = queryResults.length;
                    console.log("QueryCount:");
                    console.log(queryResults.length);
                    $scope.queryCount2 = queryResults;
                    console.log("QueryCount2:");
                    console.log($scope.queryCount2);
                })
                .error(function(queryResults) {
                    console.log('Error ' + queryResults);
                })
        };
    });