app.controller('logowanieKontroler', ['$cookieStore','$rootScope', '$scope', function ($cookieStore, $rootScope, $scope) {

    $scope.email;
    $scope.haslo;

    $scope.zaloguj = function () {
        if ($scope.email === "uzytkownik" && $scope.haslo === "uzytkownik") {
            $cookieStore.put('rolaUzytkownika','uzytkownik');
        }
        else if ($scope.email === "admin" && $scope.haslo === "admin") {
            $cookieStore.put('rolaUzytkownika','administrator');
        }
    }

    $scope.sprawdzUprawnienia = function () {
        if ( $cookieStore.get('rolaUzytkownika') ) {
            return $cookieStore.get('rolaUzytkownika')
        } else {
            return '';
        }
    }

    $scope.wyloguj = function () {
        $cookieStore.remove('rolaUzytkownika');
    }

}]);