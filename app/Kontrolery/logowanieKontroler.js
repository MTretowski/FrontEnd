angular.module('FrontEnd').controller('logowanieKontroler', function ($scope, $location) {

    $scope.email;
    $scope.haslo;

    $scope.zaloguj = function(){
        $location.path('/uzytkownik');
    }
})