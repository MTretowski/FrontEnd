app.controller('dodajTraseKontroler', function ($uibModal, $uibModalInstance, $rootScope, $scope, tankowaniaSerwis) {
    $scope.tytul = 'Dodaj trasę';
    $scope.akceptuj = 'Dodaj';
    $scope.kierowca1 = null;
    $scope.kierowca2 = null;
    $scope.pojazd = null;
    $scope.dataRozpoczecia = new Date();
    $scope.dataRozpoczecia.setUTCHours(0, 0, 0, 0);
    $scope.dataZakonczenia = new Date();
    $scope.dataZakonczenia.setUTCHours(23, 59, 0, 0);
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
            backdrop: 'static',
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
    }

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
    }

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

    $scope.trasaDodajTankowanie = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowanie.html',
            controller: 'dodajTankowanieKontroler',
            backdrop: 'static'
        });
    }

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
    }

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});