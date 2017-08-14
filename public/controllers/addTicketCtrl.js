var app = angular.module('app');

app.controller('addTicketCtrl', ['serverURL', '$scope', '$http', '$state', 'Files', function(serverURL, $scope, $http, $state, Files) {
	$scope.title = "";
	$scope.address = "";
	$scope.description = "";
	$scope.status = "pending"; //accepted, pending and refused 

	$scope.urgencyLevels = ["Baixo", "Médio", "Alto"];

	$scope.submit = function(file) {
		var imagePath; 
		if (file != undefined && $scope.title.replace(/ /g,'')+file.name != $state.params.imagePath){
			imagePath = $scope.title.replace(/ /g,'')+file.name
		} else {
			imagePath = $state.params.imagePath;
		}
		$http({
			method: 'POST',
			url: serverURL.value + '/ticket',
			data: {
				"title": $scope.title,
				"address": $scope.address,
				"description": $scope.description,
				"status":  $scope.status,
				"imagePath" : imagePath
			}
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