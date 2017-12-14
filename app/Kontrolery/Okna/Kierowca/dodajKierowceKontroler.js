app.controller('dodajKierowceKontroler', function ($uibModalInstance, $scope, nazwiskoWalidator, imieWalidator, inputSerwis) {
    $scope.tytul = 'Dodaj kierowcę';
    $scope.tekstPrzyciskuAkceptuj = 'Dodaj';

    $scope.imie = null;
    $scope.nazwisko = null;

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.akceptuj = function () {
        let blad = sprawdzPoprawnoscDanych();

        if (blad === '') {
            alert("Wszystkie dane poprawne, dodaję kierowcę");
        }
        else {
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


        return blad;
    }

});

