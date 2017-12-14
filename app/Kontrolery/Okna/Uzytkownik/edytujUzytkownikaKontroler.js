app.controller('edytujUzytkownikaKontroler', function ($uibModalInstance, $uibModal, $scope, edytowanyUzytkownik, inputSerwis, inputWalidator, imieWalidator, nazwiskoWalidator) {
    $scope.tytul = 'Edytuj użytkownika';
    $scope.tekstPrzyciskuAkceptuj = 'Zapisz zmiany';
    $scope.trybEdycji = true;

    $scope.imie = edytowanyUzytkownik.imie;
    $scope.nazwisko = edytowanyUzytkownik.nazwisko;
    $scope.login = edytowanyUzytkownik.login;
    $scope.nazwaRoli = edytowanyUzytkownik.nazwaRoli;
    $scope.statusAktywnosci = '';
    {
        if (edytowanyUzytkownik.czyAktywny) {
            $scope.statusAktywnosci = 'aktywny';
        }
        else {
            $scope.statusAktywnosci = 'nieaktywny';
        }
    }

    $scope.resetujHaslo = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoHaslo.html',
            controller: 'resetujHasloKontroler',
            backdrop: 'static',
            size: 'sm'
        });
    };

    $scope.akceptuj = function () {
        let blad = sprawdzPoprawnoscDanych();

        if(blad === ''){
            alert('Wszystko w porządku, dodaję kierowcę')
        }
        else{
            alert(blad);
        }

    };

    let sprawdzPoprawnoscDanych = function () {
        let blad = '';

        blad += nazwiskoWalidator.sprawdzNazwisko($scope.nazwisko);
        if(blad === ''){
            $scope.nazwisko = inputSerwis.usunSpacje($scope.nazwisko);
        }

        blad += imieWalidator.sprawdzImie($scope.imie);
        blad += inputWalidator.sprawdzPoleTekstowe($scope.login, 'Login');
        blad += inputWalidator.sprawdzPoleTekstowe($scope.haslo, 'Hasło');

        if($scope.rola === ''){
            blad += 'Nie wybrano roli użykownika.\n';
        }

        if($scope.statusAktywnosci === ''){
            blad += 'Nie wybrano statusu aktywności.\n'
        }

        return blad;
    };

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});