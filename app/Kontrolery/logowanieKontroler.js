app.controller('logowanieKontroler', ['$rootScope', '$scope', function ($rootScope, $scope) {

    $rootScope.rolaUzytkownika = "";

    $scope.email;
    $scope.haslo;

    $scope.zaloguj = function () {
        if ($scope.email === "uzytkownik" && $scope.haslo === "uzytkownik") {
            $rootScope.rolaUzytkownika = "uzytkownik";
        }
        else if ($scope.email === "admin" && $scope.haslo === "admin") {
            $rootScope.rolaUzytkownika = "administrator";
        }
    }

    $scope.sprawdzUprawnienia = function () {
        return $rootScope.rolaUzytkownika;
    }

    $scope.wyloguj = function () {
        $rootScope.rolaUzytkownika = "";
    }

}])