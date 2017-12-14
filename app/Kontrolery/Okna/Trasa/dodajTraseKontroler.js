app.controller('dodajTraseKontroler', function ($uibModal, $uibModalInstance, $rootScope, $scope, tankowaniaSerwis, inputWalidator, dataWalidator) {
    $scope.tytul = 'Dodaj trasę';
    $scope.tekstPrzyciskuAkceptuj = 'Dodaj';
    $scope.kierowca1 = null;
    $scope.kierowca2 = null;
    $scope.pojazd = null;
    let teraz = new Date();
    $scope.dataRozpoczecia = new Date();
    $scope.dataRozpoczecia.setUTCFullYear(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate());
    $scope.dataRozpoczecia.setUTCHours(0, 0, 0, 0);

    $scope.dataZakonczenia = new Date();
    $scope.dataZakonczenia.setUTCFullYear(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate());
    $scope.dataZakonczenia.setUTCHours(teraz.getHours(), teraz.getMinutes(), 0, 0);

    $scope.przejechaneKilometry = 0;
    $scope.paliwoZuzyteWebasto = 0;
    $scope.paliwoZuzyteCAN = 0;
    $scope.komentarz = '';
    $scope.paliwoPrzedWyjazdem = 0;
    $scope.paliwoDotankowane = 0;
    $scope.paliwoPoPowrocie = 0;

    $scope.tankowania = tankowaniaSerwis.dajTankowania();

    $scope.pomiarPoczatkowy =
        {
            'idPomiaru': null,
            'data': null,
            'ilosc': null,
        };

    $scope.pomiarKoncowy =
        {
            'idPomiaru': null,
            'data': null,
            'ilosc': null,
        };

    $scope.wybierzKierowce = function (numer) {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoWybierzKierowce.html',
            controller: 'wybierzKierowceKontroler',
            backdrop: 'static',
            resolve: {
                numerKierowcyWZalodze: function () {
                    return numer;
                },
            }
        });
    };

    $rootScope.$on('wybranoKierowce', function (zdarzenie, numerKierowcyWZalodze, obiektKierowca) {
        if (numerKierowcyWZalodze === 1) {
            $scope.kierowca1 = obiektKierowca;
        }
        else {
            $scope.kierowca2 = obiektKierowca;
        }
    });

    $scope.usunKierowce = function (numerKierowcy) {
        if (numerKierowcy === 1) {
            $scope.kierowca1 = null;
        }
        else {
            $scope.kierowca2 = null;
        }
    };

    $scope.wybierzPojazd = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoWybierzPojazd.html',
            controller: 'wybierzPojazdKontroler',
            backdrop: 'static',
        });
    };

    $rootScope.$on('wybranoPojazd', function (zdarzenie, obiektPojazd) {

        if ($scope.idPojazdu !== obiektPojazd.idPojazdu) {
            $scope.pomiarPoczatkowy.idPomiaru = null;
            $scope.pomiarPoczatkowy.data = null;
            $scope.pomiarPoczatkowy.ilosc = null;
            $scope.pomiarKoncowy.idPomiaru = null;
            $scope.pomiarKoncowy.data = null;
            $scope.pomiarKoncowy.ilosc = null;
        }

        $scope.pojazd = obiektPojazd;

        $scope.aktualizujDane();

    });

    $scope.usunPojazd = function () {
        $scope.pojazd = null;

        $scope.pomiarPoczatkowy.idPomiaru = null;
        $scope.pomiarPoczatkowy.data = null;
        $scope.pomiarPoczatkowy.ilosc = null;
        $scope.pomiarKoncowy.idPomiaru = null;
        $scope.pomiarKoncowy.data = null;
        $scope.pomiarKoncowy.ilosc = null;

        $scope.aktualizujDane();
    };


    $scope.aktualizujDane = function () {
        $scope.paliwoDotankowane = 0;
        for (i = 0; i < $scope.tankowania.length; i++) {
            if ($scope.tankowania[i].data <= $scope.dataZakonczenia && $scope.tankowania[i].data >= $scope.dataRozpoczecia && $scope.tankowania[i].idPojazdu === $scope.pojazd.idPojazdu) {
                $scope.paliwoDotankowane += $scope.tankowania[i].ilosc;
            }
        }

        if ($scope.pomiarPoczatkowy.ilosc === null) {
            $scope.paliwoPrzedWyjazdem = 0;
        }
        else {
            $scope.paliwoPrzedWyjazdem = $scope.pomiarPoczatkowy.ilosc
        }

        if ($scope.pomiarKoncowy.ilosc === null) {
            $scope.paliwoPoPowrocie = 0;
        }
        else {
            $scope.paliwoPoPowrocie = $scope.pomiarKoncowy.ilosc
        }
    };

    $scope.wybierzPomiar = function (numer) {
        if ($scope.pojazd === null) {
            alert('Uwaga!\nProszę najpierw wybrać pojazd.');
        }
        else {
            $uibModal.open({
                templateUrl: 'Widoki/Okna/oknoWybierzPomiar.html',
                controller: 'wybierzPomiarKontroler',
                backdrop: 'static',
                resolve: {
                    rodzajPomiaru: function () {
                        return numer;
                    },
                    idPojazdu: function () {
                        return $scope.pojazd.idPojazdu;
                    }

                }
            });
        }
    };

    $scope.$on('wybranoPomiar', function (zdarzenie, rodzajPomiaru, idPomiaru, dataPomiaru, ilosc) {
        if (rodzajPomiaru === 1) {
            if (idPomiaru === $scope.pomiarKoncowy.idPomiaru) {
                alert('Błąd!\nJeden pomiar nie może być jednocześnie pomiarem począkowym i końcowym.')
            }
            else {
                $scope.pomiarPoczatkowy.idPomiaru = idPomiaru;
                $scope.pomiarPoczatkowy.data = dataPomiaru;
                $scope.pomiarPoczatkowy.ilosc = ilosc;
            }
        }
        else {
            if (idPomiaru === $scope.pomiarPoczatkowy.idPomiaru) {
                alert('Błąd!\nJeden pomiar nie może być jednocześnie pomiarem począkowym i końcowym.')
            }
            else {
                $scope.pomiarKoncowy.idPomiaru = idPomiaru;
                $scope.pomiarKoncowy.data = dataPomiaru;
                $scope.pomiarKoncowy.ilosc = ilosc;
            }
        }
        $scope.aktualizujDane();
    });

    $scope.usunPomiar = function (rodzajPomiaru) {
        if (rodzajPomiaru === 1) {
            $scope.pomiarPoczatkowy.idPomiaru = null;
            $scope.pomiarPoczatkowy.data = null;
            $scope.pomiarPoczatkowy.ilosc = null;
        }
        else {
            $scope.pomiarKoncowy.idPomiaru = null;
            $scope.pomiarKoncowy.data = null;
            $scope.pomiarKoncowy.ilosc = null;
        }
        $scope.aktualizujDane();
    };

    $scope.trasaDodajTankowanie = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowanie.html',
            controller: 'dodajTankowanieKontroler',
            backdrop: 'static'
        });
    };

    $scope.trasaImportujTankowania = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowaniaZPliku.html',
            controller: 'importujTankowaniaKontroler',
            backdrop: 'static',
            size: 'sm'
        });
    };

    $scope.trasaDodajPomiar = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoPomiar.html',
            controller: 'dodajPomiarKontroler',
            backdrop: 'static'
        });
    };

    $scope.akceptuj = function () {
        let blad = sprawdzPoprawnoscDanych();

        if (blad === '') {
            if (!sprawdzCzySaPomiary()) {

                let oknoPotwierdzenia = confirm('Nie wybrano wszystkich pomiarów\nCzy kontynuować mimo to?');
                if (oknoPotwierdzenia === true) {
                    alert('Dodaję trasę mimo ostrzeżenia');
                } else {
                    alert('Nie dodaję trasy po otrzymaniu ostrzeżenia');
                }
            }
            else {
                alert("Wszystkie dane poprawne, dodaję trasę");
            }
        }
        else {
            alert(blad);
        }

    };

    let sprawdzCzySaPomiary = function () {
        return !($scope.pomiarPoczatkowy.idPomiaru === null || $scope.pomiarKoncowy.idPomiaru === null);
    };

    let sprawdzPoprawnoscDanych = function () {
        let blad = '';

        blad += inputWalidator.sprawdzPoleTekstowe($scope.kierowca1, 'Kierowca 1');
        blad += inputWalidator.sprawdzPoleTekstowe($scope.pojazd, 'Pojazd');
        blad += inputWalidator.sprawdzPoleNumeryczne($scope.przejechaneKilometry, true, 'Przejechany dystans');
        blad += inputWalidator.sprawdzPoleNumeryczne($scope.paliwoZuzyteWebasto, false, 'Zużyte paliwo - Webasto');
        blad += inputWalidator.sprawdzPoleNumeryczne($scope.paliwoZuzyteCAN, true, 'Zużyte paliwo - CAN');

        let bladDatyRozpoczecia = inputWalidator.sprawdzPoleDaty($scope.dataRozpoczecia, 'Data rozpoczęcia trasy');
        let bladDatyZakonczenia = inputWalidator.sprawdzPoleDaty($scope.dataZakonczenia, 'Data zakończenia trasy');
        if (bladDatyRozpoczecia === '') {
            bladDatyRozpoczecia = dataWalidator.czyDataZPrzyszlosci($scope.dataRozpoczecia, 'Data rozpoczęcia trasy');
        }

        if (bladDatyZakonczenia === '') {
            bladDatyZakonczenia = dataWalidator.czyDataZPrzyszlosci($scope.dataZakonczenia, 'Data zakończenia trasy');
        }

        if (bladDatyRozpoczecia === '' && bladDatyZakonczenia === '') {
            if ($scope.dataRozpoczecia.getTime() > $scope.dataZakonczenia.getTime()) {
                blad += 'Data rozpoczęcia nie może być datą późniejszą niż data zakończenia\n';
            }
        }
        else {
            blad += bladDatyRozpoczecia;
            blad += bladDatyZakonczenia;
        }

        return blad;
    };

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});