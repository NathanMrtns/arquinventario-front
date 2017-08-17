var app = angular.module('app');

app.controller('usersCtrl', ['serverURL', '$scope', '$http', '$state', function(serverURL, $scope, $http, $state) {
	$scope.users         = "";
	$scope.senhaRepetida = "";
    $scope.senha         = "";
    $scope.nome          = "";
    $scope.email2        = "";

	getAllUsers = function() {
		$http({
			method: 'GET',
			url: serverURL.value+'/user',
		}).then(function(response){
			$scope.users = response.data;
		});
	}

	getAllUsers();

    $scope.signAdmin = function(){
        if($scope.senha != $scope.senhaRepetida){
            $scope.error = "As senhas devem ser as mesmas!";
        }else if(!validateEmail($scope.email2)){
            $scope.error = "Email inválido";
        }else{
            $scope.error = "";
            $http({
                method: 'POST',
                url: serverURL.value+'/user',
                data: {
                       role: "admin",
                       name: $scope.nome,
                       email: $scope.email2,
                       password: $scope.senha
                    }
            }).then(function(result){
                console.log(result);
                if(result.status == 200){
                    alert("Admin cadastrado com sucesso!")
                    $scope.nome          = null;
                    $scope.email2        = null;
                    $scope.senha         = null;
                    $scope.senhaRepetida = null;
                    $scope.error         = null;
                }else{
                    $scope.error = result.data;
                }
            });
        }
    }
    
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $scope.clean = function(){
    	$scope.nome          = null;
    	$scope.email2        = null;
    	$scope.senha         = null;
    	$scope.senhaRepetida = null;
    	$scope.error         = null;
    }

}]);