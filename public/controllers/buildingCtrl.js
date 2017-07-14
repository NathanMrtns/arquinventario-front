var app = angular.module('app');

app.controller('buildingCtrl', ['serverURL', '$scope', '$http', '$state', function(serverURL, $scope, $http, $state) {

	var patrimony = $state.params;
	$scope.name = $state.params.name;
	$scope.year = $state.params.year;
	$scope.style = $state.params.style;
	$scope.history = $state.params.history;
	$scope.description = $state.params.description;
	$scope.tipology = $state.params.tipology;
	$scope.address = $state.params.address;

	$scope.goToHomePage = function() {
		$state.go("home");
	}

	$scope.goToEditPage = function() {
		$state.go("editBuilding", patrimony);
	}

	$scope.delete = function(){
		console.log(patrimony);
		$http({
			method: 'DELETE',
			url: serverURL.value + '/patrimony/'+patrimony._id
		}).then(function success(response){
            if(response.status == 200){
                $state.go("home");
            } else {
                alert('Houve um erro!');
            }
        }, function error(response){
            console.log(response.status);
        });
	}

}]);
