var app = angular.module('app');

app.controller('buildingCtrl', ['serverURL', '$scope', '$http', '$state', function(serverURL, $scope, $http, $state) {

	var patrimony = $state.params;
	$scope.name = $state.params.name;
	$scope.year = $state.params.year;
	$scope.style = $state.params.style;
	$scope.history = $state.params.history;
	$scope.description = $state.params.description;
	$scope.tipology = $state.params.tipology;
	$scope.address = $state.params.address;
	$scope.informations = $state.params.additionalInformations;//["info1", "info2", "info3"]; //= state.params.algo que tiver no back;
	$scope.patImg;


	$http({
		method: 'GET',
		url: serverURL.value + '/upload/image/'+$scope.name+'.jpg',
		responseType: 'arraybuffer'
	}).then(function success(response){
        if(response.status == 200){
			$scope.patImg = _arrayBufferToBase64(response.data);
        } else {
            alert('Houve um erro!');
        }
    }, function error(response){
        console.log(response.status);
    });

	$scope.goToHomePage = function() {
		$state.go("home");
	}

	$scope.goToEditPage = function() {
		$state.go("editBuilding", patrimony);
	}

	$scope.delete = function(){
		$http({
			method: 'DELETE',
			url: serverURL.value + '/patrimony/'+patrimony._id
		}).then(function success(response){
            if(response.status == 200){
                $state.go("home");
            } else {
                alert('Houve um erro!');
            }
        }, function error(response){
            console.log(response.status);
        });
	}


	$scope.sendComment = function(){
		$http({
			method: 'PUT',
			url: serverURL.value + '/patrimony/addInformation/'+patrimony._id,
			data: {"addInfo":$scope.info}

			}).then(function success(response){
            if(response.status == 200){
                $scope.informations = response.data.additionalInformations;
								console.log(response);
            } else {
                alert('Houve um erro!');
            }
        }, function error(response){
            console.log(response.status);
        });

//				$scope.informations.push($scope.info)
				$scope.info = "";

		//console.log($scope.informations);
		//$state.go("building");
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