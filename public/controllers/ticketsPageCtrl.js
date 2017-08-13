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

	$scope.acceptTicket = function(ticket) {
		//console.log(ticket);
		$http({
			method: 'PUT',
			url: serverURL.value + '/ticket/'+ticket._id
		}).then(function(response){
			console.log(response);
			ticket.status = "accepted"
		})
	}

	$scope.refuseTicket = function(ticket) {
		//console.log(ticket);
		$http({
			method: 'DELETE',
			url: serverURL.value + '/ticket/'+ticket._id
		}).then(function(response){
			$state.reload();
		}) 
	}
}]);