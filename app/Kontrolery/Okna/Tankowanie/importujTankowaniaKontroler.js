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
            alert('Proszę wybrać dostawcę paliwa.')
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
                return '';
            }
        }
        return 'Błędny kod waluty' + ' (' + waluta + '). ';
    }

    var sprawdzIloscDniWMiesiacu = function (dzien, miesiac, surowyString) {
        var maxDniWMiesiacu = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var nazwyMiesiecy = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

        if (dzien < 1) {
            return 'Wprowadzono niepoprawną datę ' + surowyString + ' (Numer dnia miesiąca musi być liczbą większą od 0)';
        }
        else if (miesiac > 12 || miesiac < 0) {
            return 'Wprowadzono niepoprawną datę ' + surowyString + ' (Numer miesiąca musi być liczbą z zakresu 1-12)';
        }
        else {
            if (dzien > maxDniWMiesiacu[miesiac - 1]) {
                if (miesiac == 2) {
                    if (dzien == 29) {
                        if ((rok % 4 == 0 && rok % 100 != 0) || rok % 400 == 0) {
                            return '';
                        }
                        else {
                            return 'Wprowadzono niepoprawną datę ' + surowyString + ' (Luty w roku nieprzestępnym ma 28 dni)';
                        }
                    }
                    else {
                        return 'Wprowadzono niepoprawną datę ' + surowyString + ' (Luty w roku nieprzestępnym ma 28 dni, a w przestępnym 29 dni)';
                    }
                }
                else {
                    return 'Wprowadzono niepoprawną datę ' + surowyString + ' (' + nazwyMiesiecy[miesiac - 1] + ' ma ' + maxDniWMiesiacu[miesiac - 1] + ' dni)';
                }
            }
            else {
                return '';
            }
        }
    }


    var konwertujStringNaDate = function (surowyString, dostawca) {

        var dataPodzielona;
        var dzienPodzielony;
        var godzinaPodzielona;

        dataPodzielona = surowyString.split(' ');
        dzienPodzielony = dataPodzielona[0].split('.');
        godzinaPodzielona = dataPodzielona[1].split(':');


        if (godzinaPodzielona[2] === undefined) {
            godzinaPodzielona[2] = 0;
        }
        if (dostawca == 'DKV') {
            dzienPodzielony[2] = (20 + dzienPodzielony[2]);
        }

        var data = new Date();
        data.setUTCFullYear(dzienPodzielony[2], dzienPodzielony[1] - 1, dzienPodzielony[0]);
        data.setUTCHours(godzinaPodzielona[0], godzinaPodzielona[1], godzinaPodzielona[2], 0);

        return data;

    }

    var sprawdzPoprawnoscDaty = function (surowyString) {

        var dataPodzielona;
        var dzienPodzielony;
        var godzinaPodzielona;
        var blad = '';
        dataPodzielona = surowyString.split(' ');

        if (dataPodzielona[0] === undefined || dataPodzielona[1] === undefined) {
            blad += 'Niepoprawny format daty (' + surowyString + '). ';
        }

        else {
            dzienPodzielony = dataPodzielona[0].split('.');
            godzinaPodzielona = dataPodzielona[1].split(':');

            if (dzienPodzielony[0] === undefined || sprawdzCzyToLiczba(dzienPodzielony[0]) || dzienPodzielony[0] == '' ||
                dzienPodzielony[1] === undefined || sprawdzCzyToLiczba(dzienPodzielony[1]) || dzienPodzielony[1] == '' ||
                dzienPodzielony[2] === undefined || sprawdzCzyToLiczba(dzienPodzielony[2]) || dzienPodzielony[2] == '' ||
                godzinaPodzielona[0] === undefined || sprawdzCzyToLiczba(godzinaPodzielona[0]) || godzinaPodzielona[0] == '' ||
                godzinaPodzielona[1] === undefined || sprawdzCzyToLiczba(godzinaPodzielona[1]) || godzinaPodzielona[1] == '') {
                return 'Niepoprawny format daty (' + surowyString + '). ';
            }
            else {
                if (godzinaPodzielona[0] > 23 || godzinaPodzielona[0] < 0) {
                    blad += 'Liczba godzin w dacie (' + surowyString + ') pochodzi spoza zakresu 0-23. '
                }
                if (godzinaPodzielona[1] > 59 || godzinaPodzielona[0] < 0) {
                    blad += 'Liczba minut w dacie (' + surowyString + ') pochodzi spoza zakresu 0-59. '
                }
                if (godzinaPodzielona[2] > 59 || godzinaPodzielona[0] < 0) {
                    blad += 'Liczba sekund w dacie (' + surowyString + ') pochodzi spoza zakresu 0-59. '
                }

                blad += sprawdzIloscDniWMiesiacu(dzienPodzielony[0], dzienPodzielony[1], surowyString)

                var data = new Date();
                data.setUTCFullYear(dzienPodzielony[2], dzienPodzielony[1] - 1, dzienPodzielony[0]);
                data.setUTCHours(godzinaPodzielona[0], godzinaPodzielona[1], godzinaPodzielona[2], 0);

                var teraz = new Date();
                var terazUTC = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(), teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());

                if (data > terazUTC) {
                    blad += 'Data (' + surowyString + ') pochodzi z przyszłości';
                }

            }
        }

        return blad;

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

        var blad = ''

        if (wiersz[kolumny.ilosc] === undefined || wiersz[kolumny.ilosc] == '') {
            blad += 'Nie odnaleziono kolumny Ilość. '
        }
        else {
            blad += sprawdzPoprawnoscLiczby(wiersz[kolumny.ilosc], 'Ilość');
        }

        if (wiersz[kolumny.kwota] === undefined || wiersz[kolumny.kwota] == '') {
            blad += 'Nie odnaleziono kolumny Kwota. '
        }
        else {
            blad += sprawdzPoprawnoscLiczby(wiersz[kolumny.kwota], 'Kwota');
        }

        if (wiersz[kolumny.data] === undefined || wiersz[kolumny.data] == '') {
            blad += 'Nie odnaleziono kolumny Data. '
        }
        else {
            blad += sprawdzPoprawnoscDaty(wiersz[kolumny.data]);
        }

        if (wiersz[kolumny.pojazd] === undefined || wiersz[kolumny.pojazd] == '') {
            blad += 'Nie odnaleziono kolumny Pojazd. '
        }

        if (wiersz[kolumny.opis] === undefined || wiersz[kolumny.opis] == '') {
            blad += 'Nie odnaleziono kolumny Opis. '
        }

        if ((dostawca == 'DKV' && wiersz[kolumny.opisDodatkowy] === undefined)) {
            blad += 'Nie odnaleziono kolumny Opis dodatkowy. '
        }

        if (dostawca == 'E100') {
            if (wiersz[kolumny.waluta === undefined] || wiersz[kolumny.waluta] == '') {
                blad += 'Nie odnaleziono kolumny Waluta. '
            }
            else {
                blad += (sprawdzPoprawnoscWaluty(wiersz[kolumny.waluta]));
            }
        }

        return blad;
    }

    var sprawdzCzyToLiczba = function (liczba) {
        return RegExp('[^(0-9)]').test(liczba);
    }

    var sprawdzPoprawnoscLiczby = function (liczba, sprawdzanaLiczba) {
        var wynikSprawdzenia = '';
        var liczbaPodzielona = liczba.split(',');

        if (liczbaPodzielona.length > 2) {
            wynikSprawdzenia += 'Niepoprawny format liczby (' + liczba + '). '
        }
        else if (liczbaPodzielona.length < 1) {
            wynikSprawdzenia += 'Nie odnaleziono liczby. '
        }
        else {
            if (sprawdzCzyToLiczba(liczbaPodzielona[0])) {
                wynikSprawdzenia += 'Część całkowita liczby (' + liczba + ') zawiera znaki niebędące cyframi. '
            }

            if (liczbaPodzielona[1] !== undefined) {
                if (sprawdzCzyToLiczba(liczbaPodzielona[1])) {
                    wynikSprawdzenia += 'Część dziesiętna liczby (' + liczba + ') zawiera znaki niebędące cyframi. '
                }
            }
        }

        if (wynikSprawdzenia == '') {
            return '';
        }
        else {
            return sprawdzanaLiczba + ': ' + wynikSprawdzenia
        }
    };

    var importuj = function (podzielonaZawartosc, dostawca, slowaKluczowe, slownik, wiersze, kolumny) {

        var wierszPodzielony;
        var czyTankowanie = false;
        var komunikat = '';
        var czyPojazdJestWBazie = false;
        var data;
        var idPojazdu;
        var waluta;
        var opisDodatkowy;
        var blad = '';
        var blednyWiersz = '';

        for (i = wiersze.pierwszeDane; i < podzielonaZawartosc.length - wiersze.liczbaWierszyPodusmowania - wiersze.liczbaKoncowychPustychWierszy; i++) {

            czyPojazdJestWBazie = false;
            czyTankowanie = false;
            komunikat = '';
            wierszPodzielony = podzielonaZawartosc[i].split(';');
            blad = sprawdzPoprawnoscWiersza(wierszPodzielony, kolumny, dostawca);


            if (blad != '') {
                blednyWiersz = wierszPodzielony[0];
                for (j = 1; j < wierszPodzielony.length; j++) {
                    blednyWiersz += '; ' + wierszPodzielony [j]
                }

                $scope.bledneWiersze.splice($scope.bledneWiersze.length, 0, {
                    'wiersz': blednyWiersz,
                    'blad': blad
                })
            }

            else {
                if (dostawca == 'E100') {
                    waluta = wierszPodzielony[kolumny.waluta];
                    opisDodatkowy = '';
                }
                else {
                    waluta = 'EUR';
                    opisDodatkowy = wierszPodzielony[kolumny.opisDodatkowy];
                }

                data = konwertujStringNaDate(wierszPodzielony[kolumny.data], dostawca);

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
                    komunikat += 'Nie odnaleziono pojazdu ' + wierszPodzielony[kolumny.pojazd] + ' w bazie';
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
                    komunikat += 'Opis nie jest zgodny z żadnym ze zdefiniowanych słów: ' + slownik.toString();

                    if (dostawca == 'E100') {
                        komunikat += '; Nie odnaleziono w opisie żadnego ze słów kluczowych: ' + slowaKluczowe.toString();
                    }
                    else if (dostawca == 'DKV') {
                        komunikat += '; Nie odnaleziono w opisie dodatkowym żadnego ze słów kluczowych: ' + slowaKluczowe.toString();
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
