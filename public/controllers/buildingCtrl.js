var app = angular.module('app');

app.controller('buildingCtrl', ['serverURL', '$scope', '$http', '$state', function(serverURL, $scope, $http, $state) {

	var patrimony = $state.params;
	var latlong = [];
	$scope.name = $state.params.name;
	$scope.year = $state.params.year;
	$scope.style = $state.params.style;
	$scope.history = $state.params.history;
	$scope.description = $state.params.description;
	$scope.tipology = $state.params.tipology;
	$scope.address = $state.params.address;
	$scope.informations = $state.params.additionalInformations;//["info1", "info2", "info3"]; //= state.params.algo que tiver no back;
	$scope.imagePath = $state.params.imagePath;
	$scope.marker;
	$scope.infowindow;
	$scope.info = "";
	$scope.userRole = sessionStorage.getItem('role');
	$scope.googleMapsUrl= "https://maps.googleapis.com/maps/api/js?key=AIzaSyAkkCmNJhGmWTkcYRCwxTkyNy4Mx2PCnh0";

	$http({
		method: 'GET',
		url: serverURL.value + '/upload/image/'+$scope.imagePath,
		responseType: 'arraybuffer'
	}).then(function success(response){
        if(response.status == 200){
			$scope.patImg = _arrayBufferToBase64(response.data);
			console.log($scope.patImg)
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
	}

	var geocoder = new google.maps.Geocoder();

    var geocodeAddress = function(address, callback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0].geometry.location);
            } else {
				console.log("Geocode was not successful for the following reason: " + status);
				callback(status);
            }
        });
	};
	
	geocodeAddress($scope.address+",Campina Grande, PB", function(location){
		if(location == "ZERO_RESULTS"){
			$scope.map = { center: [-7.2291, -35.8808] }; //Campina Grande
		}else{
			$scope.$apply(function() {
				$scope.map = { 
					center: [location.lat(), location.lng()]
				};

				$scope.marker = {
					position: [location.lat(), location.lng()],
					decimals: 4,
					options: function() {
						return { draggable: false };
					}
				}
			});
		}
	});

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