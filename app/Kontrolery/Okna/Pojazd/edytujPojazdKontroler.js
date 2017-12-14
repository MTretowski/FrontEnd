app.controller('edytujPojazdKontroler', function ($uibModalInstance, $scope, edytowanyPojazd, inputSerwis, inputWalidator) {
    $scope.tytul = 'Edytuj pojazd';
    $scope.tekstPrzyciskuAkceptuj = 'Zapisz zmiany';

    $scope.numerRejestracyjny = edytowanyPojazd.numerRejestracyjny;
    $scope.markaIModel = edytowanyPojazd.markaIModel;
    $scope.przelicznikZbiornikLewy = edytowanyPojazd.przelicznikZbiornikLewy;
    $scope.przelicznikZbiornikPrawy = edytowanyPojazd.przelicznikZbiornikPrawy;
    $scope.maxPojemnoscZbiornikLewy = edytowanyPojazd.maxPojemnoscZbiornikLewy;
    $scope.maxPojemnoscZbiornikPrawy = edytowanyPojazd.maxPojemnoscZbiornikPrawy;
    $scope.statusAktywnosci = '';
    {
        if (edytowanyPojazd.czyAktywny) {
            $scope.statusAktywnosci = 'aktywny';
        }
        else {
            $scope.statusAktywnosci = 'nieaktywny';
        }
    }


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

    };

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});