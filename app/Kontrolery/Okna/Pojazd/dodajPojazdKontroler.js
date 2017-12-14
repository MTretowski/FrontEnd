app.controller('dodajPojazdKontroler', function ($uibModalInstance, $scope, inputSerwis, numerRejestracyjnyWalidator, inputWalidator) {
    $scope.tytul = 'Dodaj pojazd';
    $scope.tekstPrzyciskuAkceptuj = 'Dodaj';

    $scope.numerRejestracyjny = null;
    $scope.markaIModel = null;
    $scope.przelicznikZbiornikLewy = null;
    $scope.przelicznikZbiornikPrawy = null;
    $scope.maxPojemnoscZbiornikLewy = null;
    $scope.maxPojemnoscZbiornikPrawy = null;
    $scope.statusAktywnosci = '';

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.akceptuj = function () {

        let blad = sprawdzPoprawnoscDanych();

        if(blad === '') {
            $scope.numerRejestracyjny = inputSerwis.usunSpacje($scope.numerRejestracyjny);

            let sprawdzenieNumeruRejestracyjnego = numerRejestracyjnyWalidator.sprawdzNumerRejestracyjny($scope.numerRejestracyjny);
            if (sprawdzenieNumeruRejestracyjnego !== '') {
                let oknoPotwierdzenia = confirm(sprawdzenieNumeruRejestracyjnego + '\nCzy kontynuować?');
                if (oknoPotwierdzenia === true) {
                    alert('Dodaję pojazd mimo ostrzeżenia');
                } else {
                    alert('Nie dodaję pojazdu po otrzymaniu ostrzeżenia');
                }
            }
            else{
                alert('Wszystko w porządku, dodaję pojazd');
            }
        }
        else{
            alert('Znaleziono błędy:\n' + blad);
        }
    };

    let sprawdzPoprawnoscDanych = function(){
        let blad = '';

        blad += inputWalidator.sprawdzPoleTekstowe($scope.numerRejestracyjny, 'Numer rejestracyjny');
        blad += inputWalidator.sprawdzPoleTekstowe($scope.markaIModel, 'Marka i model');

        if ($scope.statusAktywnosci === '') {
            blad += "Nie wybrano statusu aktywności\n";
        }
        return blad;

    }

});