var app = angular.module('app');

app.controller('searchForBuildingsCtrl', ['serverURL', '$scope', '$http', '$state', function(serverURL, $scope, $http, $state, serverURL){
	type = "name";
	$scope.isName = 1;
	
	$scope.checkName = function()
	{
		type = "name";
	}

	$scope.checkAddress = function()
	{
		type = "address";
	}
	
	$scope.checkTipology = function()
	{
		type = "tipology";
	}
	
	$scope.checkYear = function()
	{
		type = "year";
	}
	
	$scope.checkStyle = function()
	{
		type = "style";
	}
	
	$scope.search = function(){
		console.log(type);
		if($scope.searchName != ""){
			$http({
				method: 'GET',
				url: serverURL.value + '/patrimony/'+type+'/'+$scope.searchName,
			}).then(function(result){

				if(result.status == 200){
					if (result.data.length == 0)
					{
						$scope.isName = 1;
						type = "name";
						$scope.patrimonys_searched = [];
						$scope.error = "Não foi encontrado nenhuma construção";
					}
					else
					{
						$scope.isSearch = 1;
						$scope.searchName = "";
						$scope.error = "";
						console.log(result.data);
						$scope.patrimonys_searched = result.data;
//						$state.go('building', result.data[0] );

					}
				}else{
				}
			});
		
		}
	
	}
	
	$scope.openPatrimony = function(patrimony){
		$state.go('building', patrimony);
	}
}]);


