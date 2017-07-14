var app = angular.module('app');

app.controller('homeCtrl', ['serverURL', '$scope', '$http', '$state', function(serverURL, $scope, $http, $state) {
	$scope.patrimonies = "";

	getAllPatrimonies = function() {
		$http({
			method: 'GET',
			url: serverURL.value+'/patrimony',
		}).then(function(response){
			$scope.patrimonies = response.data;
		});
	}

	getAllPatrimonies();

	$scope.goToAddBuildingPage = function() {
		$state.go("addNewBuilding");
	}

	$scope.goToBuildingPage = function(patrimony) {
		var patrimony_id = patrimony._id;
		var name = patrimony.name;
		var year = patrimony.year;
		var style = patrimony.style;
		var history = patrimony.history;
		var description = patrimony.description;
		var tipology = patrimony.tipology;
		$state.go("building", patrimony);
	}
}]);
