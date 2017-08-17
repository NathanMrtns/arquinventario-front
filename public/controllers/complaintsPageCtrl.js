var app = angular.module('app');

app.controller('complaintsPageCtrl', ['$scope', '$http', '$state', 'serverURL', function($scope, $http, $state, serverURL) {
	$scope.complaints       = [];
	$scope.closedComplaints = [];

	getAllComplaints = function() {
		$http({
			method: 'GET',
			url: serverURL.value+'/report',
		}).then(function(response){
			response.data.forEach(function(complaint){
				getImage(complaint.imagePath, function(image){
					complaint.image = image;
				});
				if(complaint.status == "closed"){
					$scope.closedComplaints.push(complaint);	
				} else{
					$scope.complaints.push(complaint);
				}				
			});
		});
	}

	getImage = function(imagePath, callback){
		$http({
			method: 'GET',
			url: serverURL.value + '/upload/image/'+imagePath,
			responseType: 'arraybuffer'
		}).then(function success(response){
			if(response.status == 200){
				callback(_arrayBufferToBase64(response.data));
			} else {
				alert('Houve um erro!');
			}
		}, function error(response){
			console.log(response.status);
		});
	}

	getAllComplaints();

	$scope.delete = function(id) {
		$http({
			method: 'DELETE',
			url: serverURL.value + '/report/'+id
		}).then(function success(response){
            if(response.status == 200){
				$state.go("complaintsPage");
				$state.reload();
            } else {
                alert('Houve um erro!');
            }
        }, function error(response){
            console.log(response.status);
        });
	}

	$scope.goToAddComplaintPage = function() {
		$state.go("addNewComplaint");
	}

	$scope.goToComplaintPage = function(complaint) {
		$state.go("complaint", complaint);
	}

	$scope.close = function(complaint) {
	}
	
}]);

  function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }