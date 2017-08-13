var app = angular.module('app');

app.controller('homeCtrl', ['serverURL', '$scope', '$http', '$state', function(serverURL, $scope, $http, $state) {
	type = "name";
	$scope.isName = 1;
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

	$scope.checkName = function() {
		type = "name";
	}

	$scope.checkAddress = function() {
		type = "address";
	}
	
	$scope.checkTipology = function() {
		type = "tipology";
	}
	
	$scope.checkYear = function() {
		type = "year";
	}
	
	$scope.checkStyle = function() {
		type = "style";
	}

	$scope.search = function(){
		if($scope.searchValue != ""){
			$http({
				method: 'GET',
				url: serverURL.value + '/patrimony/'+type+'/'+$scope.searchValue,
			}).then(function(result){
				if(result.status == 200){
					if (result.data.length == 0)
					{
						$scope.isName = 1;
						type = "name";
						$scope.patrimonies = [];
						$scope.error = "Nenhuma construção foi encontrada.";
					}
					else
					{
						$scope.isSearch = 1;
						$scope.searchValue = "";
						$scope.error = "";
						console.log(result.data);
						$scope.patrimonies = result.data;
					}
				}else{
				}
			});
		}
	}

	$scope.cleanSearch = function() {
		getAllPatrimonies();
	}

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
