var app = angular.module('app');

app.controller('newBuildingController', ['serverURL', '$scope', '$http', '$state','Files', function(serverURL, $scope, $http, $state, Files) {

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

	$scope.submit = function(file){
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
			Files.upload(file, $scope.name).then(function (data) {
                console.log('Uploaded successfully');
            }).catch(function(){
                console.log('Upload failed');
            });
			$state.go("home");
		});
	}

	$scope.goToHomePage = function() {
		$state.go("home");
	}

	$scope.upload = function (file, filename) {
        if (file) {
			console.log("in")
            Files.upload(file, $scope.name).then(function (data) {
                console.log('Uploaded successfully');
            }).catch(function(){
                console.log('Upload failed');
            });
        }
    };

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