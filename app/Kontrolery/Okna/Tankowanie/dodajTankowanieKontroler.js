app.controller('dodajTankowanieKontroler', function ($uibModalInstance, $uibModal, $rootScope, $scope, inputWalidator, dataWalidator) {
    $scope.tytul = 'Dodaj tankowanie';
    $scope.tekstPrzyciskuAkceptuj = 'Dodaj';
    $scope.czyEdycjaImportowanego = false;
    let teraz = new Date();
    let terazUTC = new Date();
    terazUTC.setUTCFullYear(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate());
    terazUTC.setUTCHours(12,0,0,0);
    $scope.data = terazUTC;

    $scope.pojazd = null;
    $scope.dostawca = '';
    $scope.ilosc = null;
    $scope.kwota = null;
    $scope.waluta = '';

    $scope.wybierzPojazd = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoWybierzPojazd.html',
            controller: 'wybierzPojazdKontroler',
            backdrop: 'static'
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
            alert('Wszystkie dane poprawne, dodaję tankowanie')
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