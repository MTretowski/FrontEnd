app.controller('edytujTraseKontroler', function ($uibModalInstance, $uibModal, $rootScope, $scope, edytowanaTrasaIndeks, trasySerwis, tankowaniaSerwis, pomiarySerwis, kierowcySerwis, pojazdySerwis) {

    $scope.edytowanaTrasaIndeks = edytowanaTrasaIndeks;

    $scope.trasy = trasySerwis.dajTrasy();
    $scope.tankowania = tankowaniaSerwis.dajTankowania();
    $scope.pomiary = pomiarySerwis.dajPomiary();
    $scope.kierowcy = kierowcySerwis.dajKierowcow();
    $scope.pojazdy = pojazdySerwis.dajPojazdy();

    $scope.tytul = 'Edytuj trasę';
    $scope.akceptuj = 'Zapisz zmiany';
    $scope.kierowca1 = null;
    $scope.kierowca2 = null;
    $scope.pojazd = null;
    $scope.dataRozpoczecia = $scope.trasy[$scope.edytowanaTrasaIndeks].dataRozpoczecia;
    $scope.dataZakonczenia = $scope.trasy[$scope.edytowanaTrasaIndeks].dataZakonczenia;
    $scope.przejechaneKilometry = $scope.trasy[$scope.edytowanaTrasaIndeks].przejechaneKilometry;
    $scope.paliwoZuzyteWebasto = $scope.trasy[$scope.edytowanaTrasaIndeks].paliwoZuzyteWebasto;
    $scope.paliwoZuzyteCAN = $scope.trasy[$scope.edytowanaTrasaIndeks].paliwoZuzyteCAN;
    $scope.komentarz = $scope.trasy[$scope.edytowanaTrasaIndeks].komentarz;
    $scope.paliwoDotankowane = 0;
    $scope.paliwoPrzedWyjazdem = 0;
    $scope.paliwoPoPowrocie = 0;

    {
        for (i = 0; i < $scope.kierowcy.length; i++) {
            if ($scope.kierowcy[i].idKierowcy == $scope.trasy[$scope.edytowanaTrasaIndeks].idKierowcy1) {
                $scope.kierowca1 = $scope.kierowcy[i];
                break;
            }
        }
        if ($scope.trasy[$scope.edytowanaTrasaIndeks].idKierowcy2 != null) {
            for (i = 0; i < $scope.kierowcy.length; i++) {
                if ($scope.kierowcy[i].idKierowcy == $scope.trasy[$scope.edytowanaTrasaIndeks].idKierowcy2) {
                    $scope.kierowca2 = $scope.kierowcy[i];
                    break
                }
            }
        }
        for (i = 0; i < $scope.pojazdy.length; i++) {
            if ($scope.pojazdy[i].idPojazdu == $scope.trasy[$scope.edytowanaTrasaIndeks].idPojazdu) {
                $scope.pojazd = $scope.pojazdy[i];
                break;
            }
        }
    }

    $scope.pomiarPoczatkowy =
        {
            'idPomiaru': $scope.trasy[$scope.edytowanaTrasaIndeks].idPomiaruPoczatkowego,
            'data': null,
            'ilosc': null,
        };

    $scope.pomiarKoncowy =
        {
            'idPomiaru': $scope.trasy[$scope.edytowanaTrasaIndeks].idPomiaruKoncowego,
            'data': null,
            'ilosc': null,
        };

    {
        var pomiarPoczatkowy = false;
        var pomiarKoncowy = false;
        for (i = 0; i < $scope.pomiary.length; i++) {
            if ($scope.pomiary[i].idPomiaru == $scope.pomiarPoczatkowy.idPomiaru) {
                $scope.pomiarPoczatkowy.data = $scope.pomiary[i].dataPomiaru;
                $scope.pomiarPoczatkowy.ilosc = $scope.pomiary[i].lacznie;
                pomiarPoczatkowy = true;
            }
            else if ($scope.pomiary[i].idPomiaru == $scope.pomiarKoncowy.idPomiaru) {
                $scope.pomiarKoncowy.data = $scope.pomiary[i].dataPomiaru;
                $scope.pomiarKoncowy.ilosc = $scope.pomiary[i].lacznie;
                pomiarKoncowy = true;
            }
        }

        $scope.paliwoDotankowane = 0;
        for (i = 0; i < $scope.tankowania.length; i++) {
            if ($scope.tankowania[i].data <= $scope.dataZakonczenia && $scope.tankowania[i].data >= $scope.dataRozpoczecia && $scope.tankowania[i].idPojazdu == $scope.idPojazdu) {
                $scope.paliwoDotankowane += $scope.tankowania[i].ilosc;
            }
        }

        if ($scope.pomiarPoczatkowy.ilosc == null) {
            $scope.paliwoPrzedWyjazdem = 0;
        }
        else {
            $scope.paliwoPrzedWyjazdem = $scope.pomiarPoczatkowy.ilosc
        }

        if ($scope.pomiarKoncowy.ilosc == null) {
            $scope.paliwoPoPowrocie = 0;
        }
        else {
            $scope.paliwoPoPowrocie = $scope.pomiarKoncowy.ilosc
        }

    }


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
        if (numerKierowcyWZalodze == 1) {
            $scope.kierowca1 = obiektKierowca;
        }
        else {
            $scope.kierowca2 = obiektKierowca;
        }
    });

    $scope.usunKierowce = function (numerKierowcy) {
        if (numerKierowcy == 1) {
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
            backdrop: 'static'
        });
    };

    $rootScope.$on('wybranoPojazd', function (zdarzenie, obiektPojazd) {

        if ($scope.idPojazdu != obiektPojazd.idPojazdu) {
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
        $scope.idPojazdu = null;

        $scope.pomiarPoczatkowy.idPomiaru = null;
        $scope.pomiarPoczatkowy.data = null
        $scope.pomiarPoczatkowy.ilosc = null
        $scope.pomiarKoncowy.idPomiaru = null
        $scope.pomiarKoncowy.data = null
        $scope.pomiarKoncowy.ilosc = null;

        $scope.aktualizujDane();
    };


    $scope.aktualizujDane = function () {
        $scope.paliwoDotankowane = 0;
        for (i = 0; i < $scope.tankowania.length; i++) {
            if ($scope.tankowania[i].data <= $scope.dataZakonczenia && $scope.tankowania[i].data >= $scope.dataRozpoczecia && $scope.tankowania[i].idPojazdu == $scope.pojazd.idPojazdu) {
                $scope.paliwoDotankowane += $scope.tankowania[i].ilosc;
            }
        }

        if ($scope.pomiarPoczatkowy.ilosc == null) {
            $scope.paliwoPrzedWyjazdem = 0;
        }
        else {
            $scope.paliwoPrzedWyjazdem = $scope.pomiarPoczatkowy.ilosc
        }

        if ($scope.pomiarKoncowy.ilosc == null) {
            $scope.paliwoPoPowrocie = 0;
        }
        else {
            $scope.paliwoPoPowrocie = $scope.pomiarKoncowy.ilosc
        }
    };

    $scope.wybierzPomiar = function (numer) {
        if ($scope.idPojazdu == null) {
            alert("Uwaga!\nProszę najpierw wybrać pojazd.");
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
                        return $scope.idPojazdu;
                    }

                }
            });
        }
    };

    $scope.$on('wybranoPomiar', function (zdarzenie, rodzajPomiaru, idPomiaru, dataPomiaru, ilosc) {
        if (rodzajPomiaru == 1) {
            if (idPomiaru == $scope.pomiarKoncowy.idPomiaru) {
                alert('Błąd!\nJeden pomiar nie może być jednocześnie pomiarem począkowym i końcowym.')
            }
            else {
                $scope.pomiarPoczatkowy.idPomiaru = idPomiaru;
                $scope.pomiarPoczatkowy.data = dataPomiaru;
                $scope.pomiarPoczatkowy.ilosc = ilosc;
            }
        }
        else {
            if (idPomiaru == $scope.pomiarPoczatkowy.idPomiaru) {
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
        if (rodzajPomiaru == 1) {
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


    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.inicjalizujPomiary = function () {
        var pomiarPoczatkowy = false;
        var pomiarKoncowy = false;
        alert(1);
        for (i = $scope.pomiary.length; i >= 0 && pomiarPoczatkowy == false && pomiarKoncowy == false; i--) {
            alert(2);
            if ($scope.pomiary[i].idPomiaru == $scope.pomiarPoczatkowy.idPomiaru) {
                $scope.pomiarPoczatkowy.data = $scope.pomiary[i].dataPomiaru;
                $scope.pomiarPoczatkowy.ilosc = $scope.pomiary[i].lacznie;
                pomiarPoczatkowy = true;
            }
            else if ($scope.pomiary[i].idPomiaru == $scope.pomiarKoncowy.idPomiaru) {
                $scope.pomiarKoncowy.data = $scope.pomiary[i].dataPomiaru;
                $scope.pomiarKoncowy.ilosc = $scope.pomiary[i].lacznie;
                pomiarKoncowy = true;
            }
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


});