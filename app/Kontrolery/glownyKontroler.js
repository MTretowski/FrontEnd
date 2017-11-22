app.controller('glownyKontroler', ['$cookieStore', '$scope', '$uibModal', function ($cookieStore, $scope, $uibModal) {

    $scope.email;
    $scope.haslo;

    $scope.zmienHaslo = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoHaslo.html',
            controller: 'zmienHasloKontroler',
            size: 'sm'
        });
    };

    $scope.zaloguj = function () {
        if ($scope.email === "uzytkownik" && $scope.haslo === "uzytkownik") {
            $cookieStore.put('rolaUzytkownika', 'uzytkownik');
        }
        else if ($scope.email === "admin" && $scope.haslo === "admin") {
            $cookieStore.put('rolaUzytkownika', 'administrator');
        }
    }

    $scope.sprawdzUprawnienia = function () {
        if ($cookieStore.get('rolaUzytkownika')) {
            return $cookieStore.get('rolaUzytkownika')
        } else {
            return '';
        }
    }

    $scope.wyloguj = function () {
        $cookieStore.remove('rolaUzytkownika');
    }

}]);