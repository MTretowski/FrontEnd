app.controller('glownyKontroler', function ($cookieStore, $rootScope, $scope, $uibModal) {

    $scope.login;
    $scope.haslo;

    $scope.zmienHaslo = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoHaslo.html',
            controller: 'zmienHasloKontroler',
            backdrop  : 'static',
            size: 'sm'
        });
    };

    $rootScope.sprawdzUprawnienia = function () {
        if ($cookieStore.get('rolaUzytkownika')) {
            return $cookieStore.get('rolaUzytkownika')
        } else {
            return '';
        }
    }

    $scope.zaloguj = function () {
        if ($scope.login == "uzytkownik" && $scope.haslo == "uzytkownik") {
            $cookieStore.put('rolaUzytkownika', 'uzytkownik');
            $scope.login = '';
        }
        else if ($scope.login == "admin" && $scope.haslo == "admin") {
            $cookieStore.put('rolaUzytkownika', 'administrator');
            $scope.login = '';
        }
        $scope.haslo = '';

    }

    $scope.wyloguj = function () {
        $cookieStore.remove('rolaUzytkownika');
    }

});