var app = angular.module('app');

app.controller('addComplaintCtrl', ['serverURL', '$scope', '$http', '$state', 'Files', function(serverURL, $scope, $http, $state, Files) {

	$scope.title = "";
	$scope.address = "";
	$scope.date = "";
	$scope.description = "";

	$scope.submit = function(file){
		var imagePath;
		if (file != undefined && $scope.title.replace(/ /g,'')+file.name != $state.params.imagePath){
			imagePath = $scope.title.replace(/ /g,'')+file.name
		} else {
			imagePath = $state.params.imagePath;
		}

		console.log(imagePath);
		$http({
			method: 'POST',
			url: serverURL.value + '/report',
			data: {
				"title": $scope.title,
				"status": "open",
				"address": $scope.address,
				"date": $scope.date,
				"description": $scope.description,
				"imagePath": imagePath
			}
		}).then(function(response){
			if (Files != undefined){
				Files.upload(file, imagePath).then(function (data) {
					console.log('Uploaded successfully');
				}).catch(function(){
					console.log('Upload failed');
				});
				alert("Denúncia cadastrada com sucesso!");
				$state.go("home");
			}
		});
	}
	$scope.goToHomePage = function() {
		$state.go("home");
	}

}]);
