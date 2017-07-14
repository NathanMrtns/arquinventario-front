var app = angular.module('app');

app.controller('complaintCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
	var complaint = $state.params;
	$scope.title = $state.params.title;
	$scope.description = $state.params.description;
	$scope.address = $state.params.address;

	$scope.goToComplaintsPage = function() {
		$state.go("complaintsPage");
	}
}]);