app.controller('glownyKontroler', function ($cookieStore, $rootScope, $scope, $uibModal, uzytkownicySerwis) {

    $scope.uzytkownicy = uzytkownicySerwis.dajUzytkownikow();

    $scope.login = '';
    $scope.haslo = '';
    $scope.imie = '';
    $scope.nazwisko = '';
    $scope.rolaUzytkownika = '';

    {
        if ($cookieStore.get('imie')) {
            $scope.imie = $cookieStore.get('imie')
        }

        if ($cookieStore.get('nazwisko')) {
            $scope.nazwisko = $cookieStore.get('nazwisko')
        }

        if ($cookieStore.get('rolaUzytkownika')) {
            $scope.rolaUzytkownika = $cookieStore.get('rolaUzytkownika')
        }
    }

    $scope.zmienHaslo = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoHaslo.html',
            controller: 'zmienHasloKontroler',
            backdrop  : 'static',
            size: 'sm'
        });
    };

    $rootScope.sprawdzUprawnienia = function () {
        alert(rolaUzytkownika);
        return rolaUzytkownika;
    };

    $scope.zaloguj = function () {
        if ($scope.login === "uzytkownik" && $scope.haslo === "uzytkownik") {
            $cookieStore.put('rolaUzytkownika', 'uzytkownik');
            zalogowano();
        }
        else if ($scope.login === "admin" && $scope.haslo === "admin") {
            $cookieStore.put('rolaUzytkownika', 'administrator');
            zalogowano();
        }
        else{
            alert("Niepoprawny login lub hasło");
        }
    };

    let zalogowano = function(){

        for(i = 0; i < $scope.uzytkownicy.length; i++){
            if($scope.login === $scope.uzytkownicy[i].login){
                $cookieStore.put('imie',$scope.uzytkownicy[i].imie);
                $cookieStore.put('nazwisko',$scope.uzytkownicy[i].nazwisko);
                $scope.imie = $scope.uzytkownicy[i].imie;
                $scope.nazwisko = $scope.uzytkownicy[i].nazwisko;
            }
        }

        $scope.rolaUzytkownika = $cookieStore.get('rolaUzytkownika');

        $scope.login = '';
        $scope.haslo = '';
    };

    $rootScope.sprawdzUprawnienia = function(){
        return $scope.rolaUzytkownika;
    };

    $scope.wyloguj = function () {
        $cookieStore.remove('rolaUzytkownika');
        $cookieStore.remove('imie');
        $cookieStore.remove('nazwisko');
        $scope.imie = '';
        $scope.nazwisko = '';
        $scope.rolaUzytkownika = '';
    }

});