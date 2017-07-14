var app = angular.module('app');

app.controller('loginCtrl', ['serverURL', '$scope', '$http', '$state', function(serverURL, $scope, $http, $state) {
    $scope.viewDiv  = true;
    $scope.$state = $state.current.name;
    $scope.email    = "";
    $scope.password = "";

    $scope.senhaRepetida = "";
    $scope.senha         = "";
    $scope.nome          = "";
    $scope.email2        = "";

    $scope.login = function(){
        $http({
            method: 'POST',
            url: serverURL.value+'/login',
            data: {
                "email" : $scope.email,
                "password": $scope.password
            }
        }).then(function success(response){
            if(response.status == 200){
                $state.go("home");
            }else{
                $scope.error = "Credenciais inválidas!"
            }
        }, function error(response){
            $scope.error = "Credenciais inválidas!"
        });
    }

    $scope.signUp = function(){
        console.log("entrou")

        if($scope.senha != $scope.senhaRepetida){
            $scope.error = "As senhas devem ser as mesmas!";
        }else{
            $scope.error = "";
            $http({
                method: 'POST',
                url: serverURL.value+'/user',
                data: {name: $scope.nome, email: $scope.email2, password: $scope.senha}
            }).then(function(result){
                console.log(result);
                if(result.status == 200){
                    $scope.viewDiv  = true;
                    alert("Usuário cadastrado com sucesso!")
                }else{
                    $scope.error = result.data;
                }
            });
        }
    }
}]);

