var app = angular.module('app');

app.controller('complaintsPageCtrl', ['$scope', '$http', '$state', 'serverURL', function($scope, $http, $state, serverURL) {
	$scope.complaints = "";

	getAllComplaints = function() {
		$http({
			method: 'GET',
			url: serverURL.value+'/report',
		}).then(function(response){
			$scope.complaints = response.data;
		});
	}

	getAllComplaints();

	$scope.goToAddComplaintPage = function() {
		$state.go("addNewComplaint");
	}

	$scope.goToComplaintPage = function(complaint) {
		var complaint_id = complaint._id;
		var title = complaint.title;
		var description = complaint.description;
		var address = complaint.address;

		console.log(complaint);

		$state.go("complaint", complaint);
	}
}]);