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
		var imagePath;
		if (file != undefined) {
			imagePath = $scope.name.replace(/ /g,'')+file.name;
		}
		data =  {
				"name":$scope.name,
				"year": $scope.year,
				"style": $scope.style,
				"history": $scope.history,
				"description": $scope.description,
				"tipology": $scope.tipology,
				"address" : $scope.address,
				"imagePath" : imagePath
			}
		
		$http({
			method: 'POST',
			url: serverURL.value+'/patrimony',
			data: data
		}).then(function(response){
			if (Files != undefined){
				Files.upload(file, imagePath).then(function (data) {
					console.log('Uploaded successfully');
				}).catch(function(){
					console.log('Upload failed');
				});
				$state.go("home");
			}
		});
	}

	$scope.goToHomePage = function() {
		$state.go("home");
	}

}]);

app.controller('editBuildingController', ['serverURL', '$scope', '$http', '$state','Files', function(serverURL, $scope, $http, $state, Files) {
	
	var patrimony = $state.params;

	$scope.name = $state.params.name;
	$scope.year = $state.params.year;
	$scope.style = $state.params.style;
	$scope.history = $state.params.history;
	$scope.description = $state.params.description;
	$scope.tipology = $state.params.tipology;
	$scope.address = $state.params.address;
	$scope.imagePath;

	$scope.styles = ["Arte Deco", "Contemporâneo", "Eclético", "Protomoderno", "Moderno"];
	$scope.types = ["Comercial Misto", "Institucional", "Religioso", "Residencial"];

	$scope.submit = function(file){
		var imagePath; 
		if (file != undefined && $scope.name.replace(/ /g,'')+file.name != $state.params.imagePath){
			imagePath = $scope.name.replace(/ /g,'')+file.name
		} else {
			imagePath = $state.params.imagePath;
		}
		data =  {
				"name":$scope.name,
				"year": $scope.year,
				"style": $scope.style,
				"history": $scope.history,
				"description": $scope.description,
				"tipology": $scope.tipology,
				"address" : $scope.address,
				"imagePath": imagePath
			}
		
		$http({
			method: 'PUT',
			url: serverURL.value+'/patrimony/edit/'+patrimony._id,
			data: data
		}).then(function(response){
			if (Files != undefined){
				Files.upload(file, imagePath).then(function (data) {
					console.log('Uploaded successfully');
				}).catch(function(){
					console.log('Upload failed');
				});
				$state.go("home");
			}
		});
	}

	$scope.goToHomePage = function() {
		$state.go("home");
	}

}]);

app.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat:'dd/mm/yy',
                    changeMonth: true,
                    changeYear: true,
                    onSelect:function (year) {
                        ngModelCtrl.$setViewValue(year);
                        scope.$apply();
                    }
                });
            });
        }
    }
});