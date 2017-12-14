app.controller('dodajPomiarKontroler', function ($uibModalInstance, $uibModal, $rootScope, $scope, inputWalidator) {
    $scope.tytul = 'Dodaj pomiar';
    $scope.tekstPrzyciskuAkceptuj = 'Dodaj';
    let teraz = new Date();
    let terazUTC = new Date();
    terazUTC.setUTCFullYear(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate());
    terazUTC.setUTCHours(12,0,0,0);
    $scope.data = terazUTC;
    $scope.pojazd = null;

    $scope.sposobPomiaru = 'brakPojazdu';

    $scope.zbiornikLewy = 0;
    $scope.zbiornikPrawy = 0;

    $scope.wybranoSposobPomiaru = function () {
        if ($scope.sposobPomiaru === 'recznie') {
            if ($scope.pojazd.przelicznikZbiornikLewy === null || $scope.pojazd.przelicznikZbiornikPrawy === null) {
                alert("Nie można wybrać tego sposobu pomiaru.\nNie zdefiniowano przeliczników dla zbiorników w tym pojeździe.");
                $scope.sposobPomiaru = '';
            }
        }
        else if ($scope.sposobPomiaru === 'dotankowano') {
            if ($scope.pojazd.maxPojemnoscZbiornikLewy === null || $scope.pojazd.maxPojemnoscZbiornikPrawy === null) {
                alert("Nie można wybrać tego sposobu pomiaru.\nNie zdefiniowano maksymalnych pojemności dla zbiorników w tym pojeździe");
                $scope.sposobPomiaru = '';
            }
        }
    };

    $scope.wybierzPojazd = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoWybierzPojazd.html',
            controller: 'wybierzPojazdKontroler',
            backdrop: 'static'
        });
    };

    $rootScope.$on('wybranoPojazd', function (zdarzenie, obiektPojazd) {
        $scope.pojazd = obiektPojazd;
        $scope.sposobPomiaru = '';
    });

    $scope.usunPojazd = function () {
        $scope.pojazd = null;
        $scope.sposobPomiaru = 'brakPojazdu'
    };

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.akceptuj = function () {
        let blad = sprawdzPoprawnoscDanych();

        if (blad === '') {
            alert("Wszystkie dane poprawne, dodaję pomiar")
        }
        else {
            alert(blad);
        }
    };

    let sprawdzPoprawnoscDanych = function () {
        let blad = '';

        blad += inputWalidator.sprawdzPoleTekstowe($scope.pojazd, 'Pojazd');
        blad += inputWalidator.sprawdzPoleDaty($scope.data, 'Data pomiaru');

        if ($scope.sposobPomiaru === '' || $scope.sposobPomiaru === 'brakPojazdu') {
            blad += "Nie wybrano sposobu pomiaru.\n";
        }
        else {

            blad += inputWalidator.sprawdzPoleNumeryczne($scope.zbiornikLewy, false, 'Zbiornik prawy');
            blad += inputWalidator.sprawdzPoleNumeryczne($scope.zbiornikPrawy, false, 'Zbiornik lewy');

            if (inputWalidator.sprawdzPoleNumeryczne($scope.zbiornikPrawy, false) && inputWalidator.sprawdzPoleNumeryczne($scope.zbiornikLewy, false)) {

                if ($scope.sposobPomiaru === 'dotankowano') {
                    if ($scope.zbiornikLewy > $scope.pojazd.maxPojemnoscZbiornikLewy) {
                        blad += 'Ilość dotanowanego paliwa do zbiornika lewego jest większa niż zdefiniowana pojemność zbiornika.\n';
                    }
                    if ($scope.zbiornikPrawy > $scope.pojazd.maxPojemnoscZbiornikPrawy) {
                        blad += 'Ilość dotanowanego paliwa do zbiornika prawego jest większa niż zdefiniowana pojemność zbiornika.\n';
                    }
                }
                else if ($scope.sposobPomiaru === 'zmierzono') {
                    if ($scope.zbiornikLewy > $scope.pojazd.maxPojemnoscZbiornikLewy) {
                        blad += 'Ilość zmierzonego paliwa w zbiorniku lewym jest większa niż zdefiniowana pojemność zbiornika.\n';
                    }
                    if ($scope.zbiornikPrawy > $scope.pojazd.maxPojemnoscZbiornikPrawy) {
                        blad += 'Ilość zmierzonego paliwa w zbiorniku prawym jest większa niż zdefiniowana pojemność zbiornika.\n';
                    }
                }
                else if ($scope.sposobPomiaru === 'recznie') {
                    if ($scope.pojazd.maxPojemnoscZbiornikLewy !== null) {
                        if (($scope.pojazd.przelicznikZbiornikLewy * $scope.zbiornikLewy) > $scope.pojazd.maxPojemnoscZbiornikLewy) {
                            blad += 'Ilość zmierzonego paliwa w zbiorniku lewym jest większa niż zdefiniowana pojemność zbiornika.\n';
                        }
                    }
                    if ($scope.pojazd.maxPojemnoscZbiornikPrawy !== null) {
                        if (($scope.pojazd.przelicznikZbiornikPrawy * $scope.zbiornikPrawy) > $scope.pojazd.maxPojemnoscZbiornikPrawy) {
                            blad += 'Ilość zmierzonego paliwa w zbiorniku prawym jest większa niż zdefiniowana pojemność zbiornika.\n';
                        }
                    }
                }
            }
        }

        return blad;
    };

});