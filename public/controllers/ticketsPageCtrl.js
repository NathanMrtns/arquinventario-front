var app = angular.module('app');

app.controller('ticketsPageCtrl', ['serverURL', '$scope', '$http', '$state', function(serverURL, $scope, $http, $state) {
	$scope.tickets = "";

	getAllTickets = function() {
		$http({
			method: 'GET',
			url: serverURL.value + '/ticket'
		}).then(function(response){
			$scope.tickets = response.data;
		}) 
	}

	getAllTickets();
}]);