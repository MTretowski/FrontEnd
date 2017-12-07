app.controller('importujTankowaniaKontroler', function ($uibModalInstance, $uibModal, $rootScope, $scope, pojazdySerwis) {

    $scope.pojazdy = pojazdySerwis.dajPojazdy();
    $scope.dostawca = '';
    $scope.zaimportowaneTankowania = [];
    $scope.tankowaniaZOstrzezeniami = [];
    $scope.inneZdarzenia = [];
    $scope.bledneWiersze = [];

    var slowaKluczoweE100 = ['ON'];
    var slownikE100 = ['ON', 'ON letni', 'ON euro', 'ON zimowy', 'ON turbo'];
    var wierszeE100 =
        {
            'naglowek': 0,
            'pierwszeDane': 1,
            'liczbaWierszyPodusmowania': 1,
            'liczbaKoncowychPustychWierszy': 1
        }
    var kolumnyE100 =
        {
            'ilosc': 11,
            'kwota': 12,
            'waluta': 10,
            'data': 0,
            'pojazd': 3,
            'opis': 13
        };

    var slowaKluczoweDKV = ['ON', 'TRUCK DIESEL'];
    var slownikDKV = ['Diesel SB (samoobsługa)'];
    var wierszeDKV =
        {
            'naglowek': 11,
            'pierwszeDane': 12,
            'liczbaWierszyPodusmowania': 3,
            'liczbaKoncowychPustychWierszy': 1
        }

    var kolumnyDKV =
        {
            'ilosc': 5,
            'kwota': 8,
            'data': 3,
            'pojazd': 0,
            'opis': 11,
            'opisDodatkowy': 10
        };
    var waluty = ['PLN', 'EUR', 'GBP', 'HUF', 'CHF', 'RUB'];

    $scope.importuj = function () {
        if ($scope.dostawca == '') {
            alert("Proszę wybrać dostawcę paliwa.")
        }
        else {
            var plik = document.getElementById('wyborPliku').files[0];
            if (plik === undefined) {
                alert('Proszę wybrać plik');
            }
            var podzielonaNazwaPliku = plik.name.split('.');
            var rozszerzeniePliku = podzielonaNazwaPliku[podzielonaNazwaPliku.length - 1]

            if (rozszerzeniePliku != 'csv') {
                alert('Wybrano plik o niewłaściwym rozszerzeniu. Proszę wybrać plik o rozszerzenie .csv');
            }
            else {
                var fileReader = new FileReader();
                fileReader.readAsText(plik);
                fileReader.onloadend = function (e) {
                    var zawartoscPliku = e.target.result;
                    var podzielonaZawartosc = zawartoscPliku.split('\n');

                    if ($scope.dostawca == 'E100') {
                        importuj(podzielonaZawartosc, $scope.dostawca, slowaKluczoweE100, slownikE100, wierszeE100, kolumnyE100);
                    }
                    else if ($scope.dostawca == 'DKV') {
                        importuj(podzielonaZawartosc, $scope.dostawca, slowaKluczoweDKV, slownikDKV, wierszeDKV, kolumnyDKV);
                    }
                }
                $scope.zamknij();
            }
        }
    }

    var sprawdzPoprawnoscWaluty = function (waluta) {
        for (j = 0; j < waluty.length; j++) {
            if (waluty[j] == waluta) {
                return true;
            }
        }
        return false;
    }

    var sprawdzIloscDniWMiesiacu = function (dzien, miesiac) {
        var maxDniWMiesiacu = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (dzien < 1) {
            return false;
        }
        else if (miesiac > 12 || miesiac < 0) {
            return false;
        }
        else {
            if (dzien > maxDniWMiesiacu[miesiac - 1]) {
                if (miesiac == 2) {
                    if (dzien == 29) {
                        if ((rok % 4 == 0 && rok % 100 != 0) || rok % 400 == 0) { // Czy rok jest przestępny
                            return true;
                        }
                        else {
                            return false
                        }
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        }
    }


    var konwertujStringNaDate = function (surowyString, dostawca) {

        var dataPodzielona;
        var dzienPodzielony;
        var godzinaPodzielona;

        dataPodzielona = surowyString.split(' ');

        if (dataPodzielona[0] === undefined || dataPodzielona[1] === undefined) {
            return "Niepoprawny format daty";
        }

        dzienPodzielony = dataPodzielona[0].split('.');
        godzinaPodzielona = dataPodzielona[1].split(':');

        if (dzienPodzielony[0] === undefined ||
            dzienPodzielony[1] === undefined ||
            dzienPodzielony[2] === undefined ||
            godzinaPodzielona[0] === undefined ||
            godzinaPodzielona[1] === undefined) {
            return "Niepoprawny format daty";
        }

        if (godzinaPodzielona[0] > 23 || godzinaPodzielona[0] < 0 ||
            godzinaPodzielona[1] > 59 || godzinaPodzielona[0] < 0 ||
            godzinaPodzielona[2] > 59 || godzinaPodzielona[0] < 0) {
            return "Niepoprawny format daty";
        }

        if (sprawdzIloscDniWMiesiacu(dzienPodzielony[0], dzienPodzielony[1]) == false) {
            return "Niepoprawny format daty";
        }

        if (godzinaPodzielona[2] === undefined) {
            godzinaPodzielona[2] = 0;
        }
        if (dostawca == "DKV") {
            dzienPodzielony[2] = (20 + dzienPodzielony[2]);
        }

        data = new Date();
        data.setUTCFullYear(dzienPodzielony[2], dzienPodzielony[1] - 1, dzienPodzielony[0]);
        data.setUTCHours(godzinaPodzielona[0], godzinaPodzielona[1], godzinaPodzielona[2], 0);

        if (isNaN(data)) {
            return "Niepoprawny format daty";
        }
        else {
            var teraz = new Date();
            var terazUTC = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(), teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());

            if (data > terazUTC) {
                return "Niepoprawny format daty";
            }

            return data;
        }
    }

    var sprawdzCzyToTankowanie = function (opis, slownik) {
        for (j = 0; j < slownik.length; j++) {
            if (opis == slownik[j]) {
                return true;
            }
        }
        return false;
    }

    var sprawdzSlowaKluczowe = function (opis, slowaKluczowe, dostawca) {
        if (dostawca == 'E100') {
            if (opis.includes(slowaKluczowe[0])) {
                return 'Opis zdarzenia nie jest zgodny z listą zdefiniowanych słów, ale zawiera słowo kluczowe ' + slowaKluczowe[0];
            }
            else {
                return '';
            }
        }
        else {
            if (opis.includes(slowaKluczowe[0])) {
                return 'Opis zdarzenia nie jest zgodny z listą zdefiniowanych słów, ale zawiera słowo kluczowe ' + slowaKluczowe[0];
            }
            else if (opis.includes(slowaKluczowe[1])) {
                return 'Opis zdarzenia nie jest zgodny z listą zdefiniowanych słów, ale zawiera słowo kluczowe ' + slowaKluczowe[1];
            }
            else {
                return '';
            }
        }
    }

    var sprawdzPoprawnoscWiersza = function (wiersz, kolumny, dostawca) {
        if (wiersz[kolumny.ilosc] === undefined ||
            wiersz[kolumny.kwota] === undefined ||
            wiersz[kolumny.data] === undefined ||
            wiersz[kolumny.pojazd] === undefined ||
            wiersz[kolumny.opis] === undefined ||
            (dostawca == 'DKV' && wiersz[kolumny.opisDodatkowy] === undefined) ||
            (dostawca == 'E100' && wiersz[kolumny.waluta === undefined])) {
            return false;
        }
        else {
            return true;
        }
    }

    var sprawdzPoprawnoscLiczby = function (liczbaZPrzecinkiem) {
        liczba = parseFloat(liczbaZPrzecinkiem.replace(',', '.'));
        if (!Number.isNaN(liczba)) {
            return true;
        }
        else {
            return false;
        }
    }

    var importuj = function (podzielonaZawartosc, dostawca, slowaKluczowe, slownik, wiersze, kolumny) {

        var wierszPodzielony;
        var czyTankowanie = false;
        var komunikat = '';
        var czyPojazdJestWBazie = false;
        var data;
        var idPojazdu;
        var waluta;
        var opisDodatkowy;

        for (i = wiersze.pierwszeDane; i < podzielonaZawartosc.length - wiersze.liczbaWierszyPodusmowania - wiersze.liczbaKoncowychPustychWierszy; i++) {

            czyPojazdJestWBazie = false;
            czyTankowanie = false;
            komunikat = '';
            wierszPodzielony = podzielonaZawartosc[i].split(';');

            if (!sprawdzPoprawnoscWiersza(wierszPodzielony, kolumny, dostawca)) {
                $scope.bledneWiersze.splice($scope.bledneWiersze.length, 0, {
                    'wiersz': wierszPodzielony,
                    'blad': 'Niepoprawna struktura wiersza'
                })
                continue;
            }

            if (!sprawdzPoprawnoscLiczby(wierszPodzielony[kolumny.kwota])) {
                $scope.bledneWiersze.splice($scope.bledneWiersze.length, 0, {
                    'wiersz': wierszPodzielony,
                    'blad': 'Niepoprawny format kwoty'
                })
                continue;
            }

            if (!sprawdzPoprawnoscLiczby(wierszPodzielony[kolumny.ilosc])) {
                $scope.bledneWiersze.splice($scope.bledneWiersze.length, 0, {
                    'wiersz': wierszPodzielony,
                    'blad': 'Niepoprawny format ilości'
                })
                continue;
            }

            if (dostawca == 'E100') {
                if (!sprawdzPoprawnoscWaluty(wierszPodzielony[kolumny.waluta])) {
                    $scope.bledneWiersze.splice($scope.bledneWiersze.length, 0, {
                        'wiersz': wierszPodzielony,
                        'blad': 'Błędny kod waluty'
                    })
                    continue;
                }
                waluta = wierszPodzielony[kolumny.waluta];
                opisDodatkowy = '';
            }
            else {
                waluta = 'EUR';
                opisDodatkowy = wierszPodzielony[kolumny.opisDodatkowy];
            }

            data = konwertujStringNaDate(wierszPodzielony[kolumny.data], dostawca);
            if (data == 'Niepoprawny format daty') {
                $scope.bledneWiersze.splice($scope.bledneWiersze.length, 0, {
                    'wiersz': wierszPodzielony,
                    'blad': data
                })
                continue;
            }

            czyTankowanie = sprawdzCzyToTankowanie(wierszPodzielony[kolumny.opis], slownik);

            for (j = 0; j < $scope.pojazdy.length; j++) {
                if (wierszPodzielony[kolumny.pojazd] == $scope.pojazdy[j].numerRejestracyjny) {
                    czyPojazdJestWBazie = true;
                    idPojazdu = $scope.pojazdy[j].idPojazdu;
                    break;
                }
            }

            if (czyTankowanie == false) {
                if (dostawca == 'E100') {
                    komunikat += sprawdzSlowaKluczowe(wierszPodzielony[kolumny.opis], slowaKluczowe, dostawca);
                }
                else if (dostawca == 'DKV') {
                    komunikat += sprawdzSlowaKluczowe(wierszPodzielony[kolumny.opisDodatkowy], slowaKluczowe, dostawca)
                }
                if (komunikat != '') {
                    czyTankowanie = true;
                }
            }

            if (czyPojazdJestWBazie == false) {
                if (komunikat != '') {
                    komunikat += '; ';
                }
                komunikat += "Nie odnaleziono pojazdu " + wierszPodzielony[kolumny.pojazd] + " w bazie";
            }

            if (czyTankowanie) {


                if (komunikat == '') {
                    $scope.zaimportowaneTankowania.splice($scope.zaimportowaneTankowania.length, 0,
                        {
                            'ilosc': wierszPodzielony[kolumny.ilosc].replace(',', '.'),
                            'kwota': wierszPodzielony[kolumny.kwota].replace(',', '.'),
                            'waluta': waluta,
                            'data': data,
                            'pojazd': wierszPodzielony[kolumny.pojazd],
                            'idPojazdu': idPojazdu,
                            'opis': wierszPodzielony[kolumny.opis],
                            'opisDodatkowy': opisDodatkowy,
                            'komunikat': komunikat,
                            'dostawca': dostawca
                        }
                    )
                }
                else {
                    $scope.tankowaniaZOstrzezeniami.splice($scope.tankowaniaZOstrzezeniami.length, 0,
                        {
                            'ilosc': wierszPodzielony[kolumny.ilosc].replace(',', '.'),
                            'kwota': wierszPodzielony[kolumny.kwota].replace(',', '.'),
                            'waluta': waluta,
                            'data': data,
                            'pojazd': wierszPodzielony[kolumny.pojazd],
                            'idPojazdu': idPojazdu,
                            'opis': wierszPodzielony[kolumny.opis],
                            'opisDodatkowy': opisDodatkowy,
                            'komunikat': komunikat,
                            'dostawca': dostawca
                        }
                    )
                }

            }
            else {

                if (komunikat != '') {
                    komunikat += '; ';
                }
                komunikat += "Opis nie jest zgodny z żadnym ze zdefiniowanych słów: " + slownik.toString();

                if (dostawca == "E100") {
                    komunikat += "; Nie odnaleziono w opisie żadnego ze słów kluczowych: " + slowaKluczowe.toString();
                }
                else if (dostawca == "DKV") {
                    komunikat += "; Nie odnaleziono w opisie dodatkowym żadnego ze słów kluczowych: " + slowaKluczowe.toString();
                }

                $scope.inneZdarzenia.splice($scope.inneZdarzenia.length, 0,
                    {
                        'ilosc': wierszPodzielony[kolumny.ilosc].replace(',', '.'),
                        'kwota': wierszPodzielony[kolumny.kwota].replace(',', '.'),
                        'waluta': waluta,
                        'data': data,
                        'pojazd': wierszPodzielony[kolumny.pojazd],
                        'idPojazdu': idPojazdu,
                        'opis': wierszPodzielony[kolumny.opis],
                        'opisDodatkowy': opisDodatkowy,
                        'komunikat': komunikat,
                        'dostawca': dostawca
                    }
                )
            }
        }


        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoPodsumowanieImportu.html',
            controller: 'podsumowanieImportuKontroler',
            backdrop: 'static',
            size: 'lg',
            resolve: {
                tankowania: function () {
                    return $scope.zaimportowaneTankowania;
                },
                ostrzezenia: function () {
                    return $scope.tankowaniaZOstrzezeniami;
                },
                inne: function () {
                    return $scope.inneZdarzenia;
                },
                bledy: function () {
                    return $scope.bledneWiersze;
                },
                czySaOstrzezenia: function () {
                    if ($scope.tankowaniaZOstrzezeniami.length == 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                },
                czySaInneZdarzenia: function () {
                    if ($scope.inneZdarzenia.length == 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                },
                czySaTankowania: function () {
                    if ($scope.zaimportowaneTankowania.length == 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                },
                czySaBledy: function () {
                    if ($scope.bledneWiersze.length == 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                },
                dostawca: function () {
                    return $scope.dostawca;
                },
                slowaKluczowe: function () {
                    return slowaKluczowe
                },
                slownik: function () {
                    return slownik;
                }
            }
        });
    }

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

})
