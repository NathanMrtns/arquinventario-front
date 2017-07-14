var app = angular.module('app');

app.controller('newBuildingController', ['serverURL', '$scope', '$http', '$state', function(serverURL, $scope, $http, $state) {

	$scope.name = "";
	$scope.year = "";
	$scope.style = "";
	$scope.history = "";
	$scope.description = "";
	$scope.tipology = "";
	$scope.address = "";
	$scope.photos = "";

	$scope.styles = ["Arte Deco", "Contemporâneo", "Eclético", "Protomoderno", "Moderno"];
	$scope.types = ["Comercial Misto", "Institucional", "Religioso", "Residencial"];

	$scope.submit = function(){
		console.log($scope.address);
		data =  {
				"name":$scope.name,
				"year": $scope.year,
				"style": $scope.style,
				"history": $scope.history,
				"description": $scope.description,
				"tipology": $scope.tipology,
				"address" : $scope.address
			}
		
		$http({
			method: 'POST',
			url: serverURL.value+'/patrimony',
			data: data
		}).then(function(response){
			$state.go("home");
		});
	}

	$scope.goToHomePage = function() {
		$state.go("home");
	}

}]);

app.controller('editBuildingController', ['serverURL', '$scope', '$http', '$state', function(serverURL, $scope, $http, $state) {
	
	var patrimony = $state.params;

	$scope.name = $state.params.name;
	$scope.year = $state.params.year;
	$scope.style = $state.params.style;
	$scope.history = $state.params.history;
	$scope.description = $state.params.description;
	$scope.tipology = $state.params.tipology;
	$scope.address = $state.params.address;
	
	$scope.submit = function(){
		data =  {
				"name":$scope.name,
				"year": $scope.year,
				"style": $scope.style,
				"history": $scope.history,
				"description": $scope.description,
				"tipology": $scope.tipology,
				"address" : $scope.address
			}
		
		$http({
			method: 'PUT',
			url: serverURL.value+'/patrimony/edit/'+patrimony._id,
			data: data
		}).then(function(response){
			$state.go("home");
		});
	}

	$scope.goToHomePage = function() {
		$state.go("home");
	}

}])