var app = angular.module('app');

app.controller('addTicketCtrl', ['serverURL', '$scope', '$http', '$state', function(serverURL, $scope, $http, $state) {
	$scope.title = "";
	$scope.address = "";
	$scope.description = "";

	$scope.urgencyLevels = ["Baixo", "Médio", "Alto"];

	$scope.submit = function() {
		$http({
			method: 'POST',
			url: serverURL.value + '/ticket',
			data: {
				"title": $scope.title,
				"address": $scope.address,
				"description": $scope.description
			}
		}).then(function(response) {
			$state.go("home");
		})
	}

	$scope.goToHomePage = function() {
		$state.go("home");
	}
}]);