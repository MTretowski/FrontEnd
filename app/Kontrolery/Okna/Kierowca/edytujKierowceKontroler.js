app.controller('edytujKierowceKontroler', function ($uibModalInstance, $scope, edytowanyKierowca, nazwiskoWalidator, imieWalidator, inputSerwis) {
    $scope.tytul = 'Edytuj kierowcę';
    $scope.tekstPrzyciskuAkceptuj = 'Zapisz zmiany';

    $scope.imie = edytowanyKierowca.imie;
    $scope.nazwisko = edytowanyKierowca.nazwisko;

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

