var app = angular.module('app');

app.controller('ticketsPageCtrl', ['serverURL', '$scope', '$http', '$state', 'Files', function(serverURL, $scope, $http, $state, Files) {
	$scope.tickets = [];

	getAllTickets = function() {
		$http({
			method: 'GET',
			url: serverURL.value + '/ticket'
		}).then(function(response){
			response.data.forEach(function(ticket){
				getImage(ticket.imagePath, function(image){
					ticket.image = image;
				});
				$scope.tickets.push(ticket);
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

  function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }