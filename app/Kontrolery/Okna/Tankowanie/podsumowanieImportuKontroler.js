app.controller('podsumowanieImportuKontroler', function ($uibModalInstance, $uibModal, $rootScope, $scope, tankowaniaSerwis, tankowania, ostrzezenia, inne, bledy, czySaOstrzezenia, czySaInneZdarzenia, czySaTankowania, czySaBledy, dostawca, slownik, slowaKluczowe) {

    $scope.zaimportowaneTankowania = tankowania;
    $scope.tankowaniaZOstrzezeniami = ostrzezenia;
    $scope.inneZdarzenia = inne;
    $scope.bledneWiersze = bledy;
    $scope.czySaOstrzezenia = czySaOstrzezenia;
    $scope.czySaInneZdarzenia = czySaInneZdarzenia;
    $scope.czySaTankowania = czySaTankowania;
    $scope.czySaBledy = czySaBledy;
    $scope.iloscTankowan = 0;
    $scope.dostawca = dostawca;

    $scope.pokazOstrzezenia = false;
    $scope.pokazDobre = false;
    $scope.pokazInne = false;
    $scope.pokazBledy = false;

    $scope.kluczSortowaniaInne = '';
    $scope.odwrotneSortowanieInne = false;
    $scope.pokazFiltryInne = false;

    $scope.kluczSortowaniaOstrzezenia = '';
    $scope.odwrotneSortowanieOstrzezenia = false;
    $scope.pokazFiltryOstrzezenia = false;

    $scope.kluczSortowania = '';
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    let teraz = new Date();
    let terazUTC = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(), teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    let dwaLataTemu = new Date(teraz.getUTCFullYear() - 2, teraz.getUTCMonth(), teraz.getUTCDate(), teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    terazUTC.setUTCHours(23, 59, 59);
    dwaLataTemu.setUTCHours(0, 0, 0);
    $scope.filtrDataOd = dwaLataTemu;
    $scope.filtrDataDo = terazUTC;
    $scope.filtrDataOdOstrzezenia = dwaLataTemu;
    $scope.filtrDataDoOstrzezenia = terazUTC;
    $scope.filtrDataOdInne = dwaLataTemu;
    $scope.filtrDataDoInne = terazUTC;

    $rootScope.$on('edytowanoTankowanie', function (zdarzenie, edytowaneTankowanie, ilosc, kwota, waluta, data,
                                                    pojazd, idPojazdu, opis, opisDodatkowy, dostawca) {
        if ($scope.zaimportowaneTankowania.indexOf(edytowaneTankowanie) >= 0) {
            $scope.zaimportowaneTankowania.splice($scope.zaimportowaneTankowania.indexOf(edytowaneTankowanie), 1);
        }
        else if ($scope.tankowaniaZOstrzezeniami.indexOf(edytowaneTankowanie) >= 0) {
            $scope.tankowaniaZOstrzezeniami.splice($scope.tankowaniaZOstrzezeniami.indexOf(edytowaneTankowanie), 1);

        }
        else if ($scope.inneZdarzenia.indexOf(edytowaneTankowanie) >= 0) {
            $scope.inneZdarzenia.splice($scope.inneZdarzenia.indexOf(edytowaneTankowanie), 1);
        }

        let czyTankowanie = sprawdzCzyToTankowanie(opis);
        let komunikat = '';

        if (czyTankowanie === false) {
            if (dostawca === 'E100') {
                komunikat += sprawdzSlowaKluczowe(opis);
            }
            else if (dostawca === 'DKV') {
                komunikat += sprawdzSlowaKluczowe(opisDodatkowy)
            }
            if (komunikat !== '') {
                czyTankowanie = true;
            }
        }

        if (czyTankowanie) {
            if (komunikat === '') {
                $scope.zaimportowaneTankowania.splice($scope.zaimportowaneTankowania.length, 0, zbudujJSONimportowanegoTankowania(
                    ilosc, kwota, waluta, data, pojazd, idPojazdu, opis, opisDodatkowy, komunikat, dostawca)
                )
            }
            else {
                $scope.tankowaniaZOstrzezeniami.splice($scope.tankowaniaZOstrzezeniami.length, 0, zbudujJSONimportowanegoTankowania(
                    ilosc, kwota, waluta, data, pojazd, idPojazdu, opis, opisDodatkowy, komunikat, dostawca)
                )
            }

        }
        else {

            if (komunikat !== '') {
                komunikat += '; ';
            }
            komunikat += 'Opis nie jest zgodny z żadnym ze zdefiniowanych słów: ' + slownik.toString();

            if (dostawca === 'E100') {
                komunikat += '; Nie odnaleziono w opisie żadnego ze słów kluczowych: ' + slowaKluczowe.toString();
            }
            else if (dostawca === 'DKV') {
                komunikat += '; Nie odnaleziono w opisie dodatkowym żadnego ze słów kluczowych: ' + slowaKluczowe.toString();
            }

            $scope.inneZdarzenia.splice($scope.inneZdarzenia.length, 0, zbudujJSONimportowanegoTankowania(
                ilosc, kwota, waluta, data, pojazd, idPojazdu, opis, opisDodatkowy, komunikat, dostawca)
            )
        }

        sprawdzDlugosciTablic();

    });

    let zbudujJSONimportowanegoTankowania = function (ilosc, kwota, waluta, data, pojazd, idPojazdu, opis, opisDodatkowy, komunikat, dostawca) {
        return {
            'ilosc': ilosc,
            'kwota': kwota,
            'waluta': waluta,
            'data': data,
            'pojazd': pojazd,
            'idPojazdu': idPojazdu,
            'opis': opis,
            'opisDodatkowy': opisDodatkowy,
            'komunikat': komunikat,
            'dostawca': dostawca,
        }
    };

    let sprawdzDlugosciTablic = function () {
        $scope.czySaOstrzezenia = $scope.tankowaniaZOstrzezeniami.length !== 0;
        $scope.czySaInneZdarzenia = $scope.inneZdarzenia.length !== 0;
        $scope.czySaTankowania = $scope.zaimportowaneTankowania.length !== 0;
    };

    $scope.edytujDobreTankowanie = function (indeks) {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowanie.html',
            controller: 'edytujTankowanieKontroler',
            backdrop: 'static',
            resolve: {
                czyEdycjaImportowanego: function () {
                    return true;
                },
                edytowaneTankowanie: function () {
                    return $scope.zaimportowaneTankowania[indeks];
                },
                slownik: function () {
                    return slownik;
                },
                slowaKluczowe: function () {
                    return slowaKluczowe;
                },
            }
        });
    };

    $scope.usunDobreTankowanie = function (indeks) {
        $scope.zaimportowaneTankowania.splice(indeks, 1);
        $scope.sprawdzCzySaTankowania();
    };

    $scope.edytujTankowanieZOstrzezeniem = function (indeks) {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowanie.html',
            controller: 'edytujTankowanieKontroler',
            backdrop: 'static',
            resolve: {
                czyEdycjaImportowanego: function () {
                    return true;
                },
                edytowaneTankowanie: function () {
                    return $scope.tankowaniaZOstrzezeniami[indeks];
                },
                slownik: function () {
                    return slownik;
                },
                slowaKluczowe: function () {
                    return slowaKluczowe;
                }
            }
        });
    };

    $scope.usunTankowanieZOstrzezeniem = function (indeks) {
        $scope.tankowaniaZOstrzezeniami.splice(indeks, 1);
        $scope.sprawdzCzySaOstrzezenia();
    };

    $scope.edytujInneZdarzenie = function (indeks) {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowanie.html',
            controller: 'edytujTankowanieKontroler',
            backdrop: 'static',
            resolve: {
                czyEdycjaImportowanego: function () {
                    return true;
                },
                edytowaneTankowanie: function () {
                    return $scope.inneZdarzenia[indeks];
                },
                slownik: function () {
                    return slownik;
                },
                slowaKluczowe: function () {
                    return slowaKluczowe;
                }
            }
        });
    };

    $scope.usunInneZdarzenie = function (indeks) {
        $scope.inneZdarzenia.splice(indeks, 1);
        $scope.sprawdzCzySaInneZdarzenia();
    };

    $scope.sprawdzCzySaOstrzezenia = function () {
        if ($scope.tankowaniaZOstrzezeniami.length === 0) {
            $scope.czySaOstrzezenia = false;
        }
    };

    $scope.sprawdzCzySaTankowania = function () {
        if ($scope.zaimportowaneTankowania.length === 0) {
            $scope.czySaTankowania = false;
        }
    };

    $scope.sprawdzCzySaInneZdarzenia = function () {
        if ($scope.inneZdarzenia.length === 0) {
            $scope.czySaInneZdarzenia = false;
        }
    };

    $scope.czyPokazacOpisDodatkowy = function () {
        return $scope.dostawca === "DKV";
    };

    let sprawdzCzyToTankowanie = function (opis) {
        for (j = 0; j < slownik.length; j++) {
            if (opis === slownik[j]) {
                return true;
            }
        }
        return false;
    };

    let sprawdzSlowaKluczowe = function (opis) {
        if (dostawca === 'E100') {
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
    };

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});