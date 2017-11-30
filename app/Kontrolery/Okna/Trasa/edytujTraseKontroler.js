app.controller('edytujTraseKontroler', function ($uibModalInstance, $uibModal, $rootScope, $scope, edytowanaTrasaIndeks, trasySerwis, tankowaniaSerwis, pomiarySerwis) {

    $scope.edytowanaTrasaIndeks = edytowanaTrasaIndeks;

    $scope.trasy = trasySerwis.dajTrasy();
    $scope.tankowania = tankowaniaSerwis.dajTankowania();
    $scope.pomiary = pomiarySerwis.dajPomiary();

    $scope.tytul = 'Edytuj trasę';
    $scope.akceptuj = 'Zapisz zmiany';
    $scope.kierowca1 = $scope.trasy[$scope.edytowanaTrasaIndeks].kierowca1;
    $scope.idKierowcy1 = $scope.trasy[$scope.edytowanaTrasaIndeks].idKierowcy1;
    $scope.kierowca2 = $scope.trasy[$scope.edytowanaTrasaIndeks].kierowca2;
    $scope.idKierowcy2 = $scope.trasy[$scope.edytowanaTrasaIndeks].idKierowcy2;
    $scope.pojazd = $scope.trasy[$scope.edytowanaTrasaIndeks].numerRejestracyjnyPojazdu;
    $scope.idPojazdu = $scope.trasy[$scope.edytowanaTrasaIndeks].idPojazdu;
    $scope.dataRozpoczecia = $scope.trasy[$scope.edytowanaTrasaIndeks].dataRozpoczecia;
    $scope.dataZakonczenia = $scope.trasy[$scope.edytowanaTrasaIndeks].dataZakonczenia;
    $scope.przejechaneKilometry = $scope.trasy[$scope.edytowanaTrasaIndeks].przejechaneKilometry;
    $scope.paliwoZuzyteWebasto = $scope.trasy[$scope.edytowanaTrasaIndeks].paliwoZuzyteWebasto;
    $scope.paliwoZuzyteCAN = $scope.trasy[$scope.edytowanaTrasaIndeks].paliwoZuzyteCAN;
    $scope.komentarz = $scope.trasy[$scope.edytowanaTrasaIndeks].komentarz;
    $scope.paliwoDotankowane = 0;
    $scope.paliwoPrzedWyjazdem = 0;
    $scope.paliwoPoPowrocie = 0;


    $scope.pomiarPoczatkowy =
        {
            'idPomiaru': $scope.trasy[$scope.edytowanaTrasaIndeks].idPomiaruPoczatkowego,
            'data': null,
            'ilosc': null,
        }

    $scope.pomiarKoncowy =
        {
            'idPomiaru': $scope.trasy[$scope.edytowanaTrasaIndeks].idPomiaruKoncowego,
            'data': null,
            'ilosc': null,
        }

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
            resolve: {
                numerKierowcyWZalodze: function () {
                    return numer;
                },
            }
        });
    }

    $rootScope.$on('wybranoKierowce', function (zdarzenie, numerKierowcyWZalodze, idKierowcy, imieINazwiskoKierowcy) {
        if (numerKierowcyWZalodze == 1) {
            $scope.kierowca1 = imieINazwiskoKierowcy;
            $scope.idKierowcy1 = idKierowcy;
        }
        else {
            $scope.kierowca2 = imieINazwiskoKierowcy;
            $scope.idKierowcy2 = idKierowcy;
        }
    })

    $scope.usunKierowce = function (numerKierowcy) {
        if (numerKierowcy == 1) {
            $scope.kierowca1 = null;
            $scope.idKierowcy1 = null;
        }
        else {
            $scope.kierowca2 = null;
            $scope.idKierowcy2 = null;
        }
    }

    $scope.wybierzPojazd = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoWybierzPojazd.html',
            controller: 'wybierzPojazdKontroler'
        });
    }

    $rootScope.$on('wybranoPojazd', function (zdarzenie, idPojazdu, numerRejestracyjnyPojazdu) {

        if ($scope.idPojazdu != idPojazdu) {
            $scope.pomiarPoczatkowy.idPomiaru = null;
            $scope.pomiarPoczatkowy.data = null
            $scope.pomiarPoczatkowy.ilosc = null
            $scope.pomiarKoncowy.idPomiaru = null
            $scope.pomiarKoncowy.data = null
            $scope.pomiarKoncowy.ilosc = null;
        }

        $scope.pojazd = numerRejestracyjnyPojazdu;
        $scope.idPojazdu = idPojazdu;

        $scope.aktualizujDane();

    })

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
    }


    $scope.aktualizujDane = function () {
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

    $scope.wybierzPomiar = function (numer) {
        if ($scope.idPojazdu == null) {
            alert("Uwaga!\nProszę najpierw wybrać pojazd.");
        }
        else {
            $uibModal.open({
                templateUrl: 'Widoki/Okna/oknoWybierzPomiar.html',
                controller: 'wybierzPomiarKontroler',
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
    }

    $scope.$on('wybranoPomiar', function (zdarzenie, rodzajPomiaru, idPomiaru, dataPomiaru, ilosc) {
        if (rodzajPomiaru == 1) {
            if(idPomiaru == $scope.pomiarKoncowy.idPomiaru){
                alert('Błąd!\nJeden pomiar nie może być jednocześnie pomiarem począkowym i końcowym.')
            }
            else {
                $scope.pomiarPoczatkowy.idPomiaru = idPomiaru;
                $scope.pomiarPoczatkowy.data = dataPomiaru;
                $scope.pomiarPoczatkowy.ilosc = ilosc;
            }
        }
        else {
            if(idPomiaru == $scope.pomiarPoczatkowy.idPomiaru){
                alert('Błąd!\nJeden pomiar nie może być jednocześnie pomiarem począkowym i końcowym.')
            }
            else {
                $scope.pomiarKoncowy.idPomiaru = idPomiaru;
                $scope.pomiarKoncowy.data = dataPomiaru;
                $scope.pomiarKoncowy.ilosc = ilosc;
            }
        }
        $scope.aktualizujDane();
    })

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
    }


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
    }

    $scope.trasaDodajTankowanie = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowanie.html',
            controller: 'dodajTankowanieKontroler'
        });
    }

    $scope.trasaDodajPomiar = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoPomiar.html',
            controller: 'dodajPomiarKontroler'
        });
    }


});