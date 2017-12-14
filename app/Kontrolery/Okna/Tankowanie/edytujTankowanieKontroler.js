app.controller('edytujTankowanieKontroler', function ($uibModalInstance, $uibModal, $rootScope, $scope, czyEdycjaImportowanego, edytowaneTankowanie, slownik, slowaKluczowe, pojazdySerwis, inputWalidator, dataWalidator) {

    $scope.tytul = 'Edytuj tankowanie';
    $scope.tekstPrzyciskuAkceptuj = 'Zapisz zmiany';
    $scope.czyEdycjaImportowanego = czyEdycjaImportowanego;
    $scope.slownik = null;
    $scope.slowaKluczowe = null;

    $scope.pojazd = null;
    $scope.data = edytowaneTankowanie.data;
    $scope.dostawca = edytowaneTankowanie.dostawca;
    $scope.ilosc = edytowaneTankowanie.ilosc;
    $scope.kwota = edytowaneTankowanie.kwota;
    $scope.waluta = edytowaneTankowanie.waluta;
    $scope.opis = null;
    $scope.opisDodatkowy = null;

    let pojazdy = pojazdySerwis.dajPojazdy();

    {
        for (i = 0; i < pojazdy.length; i++) {
            if (pojazdy[i].idPojazdu === edytowaneTankowanie.idPojazdu) {
                $scope.pojazd = pojazdy[i];
                break;
            }
        }

        if (czyEdycjaImportowanego) {
            $scope.slownik = slownik.toString();
            $scope.slowaKluczowe = slowaKluczowe.toString();
            $scope.opis = edytowaneTankowanie.opis;
            $scope.opisDodatkowy = edytowaneTankowanie.opisDodatkowy;
        }
    }

    $scope.wybierzPojazd = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoWybierzPojazd.html',
            controller: 'wybierzPojazdKontroler',
            backdrop: 'static',
        });
    };

    $rootScope.$on('wybranoPojazd', function (zdarzenie, obiektPojazd) {
        $scope.pojazd = obiektPojazd
    });

    $scope.usunPojazd = function () {
        $scope.pojazd = null;
    };

    $scope.akceptuj = function(){
        let blad = sprawdzPoprawnoscDanych();

        if(blad === ''){
            if(czyEdycjaImportowanego){
                $rootScope.$broadcast('edytowanoTankowanie', edytowaneTankowanie, $scope.ilosc, $scope.kwota, $scope.waluta, $scope.data,
                    $scope.pojazd.numerRejestracyjny, $scope.pojazd.idPojazdu, $scope.opis, $scope.opisDodatkowy, $scope.dostawca);
            }
            else{
                alert('Wszystkie dane poprawne, dodaję tankowanie');
            }
            $scope.zamknij();
        }
        else{
            alert(blad);
        }
    };

    let sprawdzPoprawnoscDanych = function(){
        let blad = '';

        blad += inputWalidator.sprawdzPoleDaty($scope.data, 'Data tankowania');
        if(blad === ''){
            blad += dataWalidator.czyDataZPrzyszlosci($scope.data, 'Data tankowania');
        }
        blad += inputWalidator.sprawdzPoleTekstowe($scope.pojazd, 'Pojazd');
        blad += inputWalidator.sprawdzPoleNumeryczne($scope.ilosc, true, 'Ilość');
        blad += inputWalidator.sprawdzPoleNumeryczne($scope.kwota, true, 'Kwota');
        if($scope.waluta === ''){
            blad += "Nie wybrano waluty.\n";
        }
        if($scope.dostawca === ''){
            blad += "Nie wybrano dostawcy.\n";
        }

        return blad;
    };

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});