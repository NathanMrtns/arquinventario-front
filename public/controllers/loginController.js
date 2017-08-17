var app = angular.module('app');

app.controller('loginCtrl', ['serverURL', '$scope', '$http', '$state', function(serverURL, $scope, $http, $state) {
    $scope.viewDiv  = true;
    $scope.$state   = "";
    $scope.email    = "";
    $scope.password = "";

    $scope.senhaRepetida = "";
    $scope.senha         = "";
    $scope.nome          = "";
    $scope.email2        = "";
    $scope.$userRole     = sessionStorage.getItem('role');

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
                sessionStorage.setItem("user", response.data._id);
                sessionStorage.setItem("role", response.data.role);
                $state.go("home");
            }else{
                $scope.error = "Credenciais inválidas!"
            }
        }, function error(response){
            $scope.error = "Credenciais inválidas!"
        });
    }

    $scope.signUp = function(){
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
                       role: "comum",
                       name: $scope.nome,
                       email: $scope.email2,
                       password: $scope.senha
                    }
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
    
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}]);

