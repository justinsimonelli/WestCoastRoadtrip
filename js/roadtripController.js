app.controller('TripController', function($scope, $http){
  $http.get("/WestCoastRoadtrip/data.json")
    .then(function(response) {
        console.log(response.data.locations)
        $scope.locations = response.data.locations;
    });
    
});