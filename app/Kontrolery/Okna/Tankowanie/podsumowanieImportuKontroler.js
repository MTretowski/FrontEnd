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

    $scope.slownik = slownik;
    $scope.slowaKluczowe = slowaKluczowe;

    var teraz = new Date();
    var dzisiaj = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(), teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    var dwaLataTemu = new Date(teraz.getUTCFullYear() - 2, teraz.getUTCMonth(), teraz.getUTCDate(), teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    dzisiaj.setUTCHours(23, 59, 59);
    dwaLataTemu.setUTCHours(0, 0, 0);
    $scope.filtrDataOd = dwaLataTemu;
    $scope.filtrDataDo = dzisiaj;
    $scope.filtrDataOdOstrzezenia = dwaLataTemu;
    $scope.filtrDataDoOstrzezenia = dzisiaj;
    $scope.filtrDataOdInne = dwaLataTemu;
    $scope.filtrDataDoInne = dzisiaj;

    $scope.edytujTankowanie = function (indeks) {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowanie.html',
            controller: 'edytujTankowanieKontroler',
            backdrop  : 'static',
            resolve: {
                czyEdycjaImportowanego: function () {
                    return true;
                },
                edytowaneTankowanie: function () {
                    return $scope.zaimportowaneTankowania[indeks];
                }
            }
        });
    };

    $scope.usunTankowanie = function (indeks) {
        $scope.zaimportowaneTankowania.splice(indeks, 1);
        $scope.sprawdzCzySaTankowania();
    }

    $scope.edytujTankowanieZOstrzezeniem = function (indeks) {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowanie.html',
            controller: 'edytujTankowanieKontroler',
            backdrop  : 'static',
            resolve: {
                czyEdycjaImportowanego: function () {
                    return true;
                },
                edytowaneTankowanie: function () {
                    return $scope.tankowaniaZOstrzezeniami[indeks];
                },
                slownik: function () {
                    return $scope.slownik;
                },
                slowaKluczowe: function () {
                    return $scope.slowaKluczowe;
                }
            }
        });
    };

    $scope.usunTankowanieZOstrzezeniem = function (indeks) {
        $scope.tankowaniaZOstrzezeniami.splice(indeks, 1);
        $scope.sprawdzCzySaOstrzezenia();
    }

    $scope.edytujInneZdarzenie = function (indeks) {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowanie.html',
            controller: 'edytujTankowanieKontroler',
            backdrop  : 'static',
            resolve: {
                czyEdycjaImportowanego: function () {
                    return true;
                },
                edytowaneTankowanie: function () {
                    return $scope.inneZdarzenia[indeks];
                },
                slownik: function () {
                    return $scope.slownik;
                },
                slowaKluczowe: function () {
                    return $scope.slowaKluczowe;
                }
            }
        });
    };

    $scope.usunInneZdarzenie = function (indeks) {
        $scope.inneZdarzenia.splice(indeks, 1);
        $scope.sprawdzCzySaInneZdarzenia();
    }

    $scope.sprawdzCzySaOstrzezenia = function () {
        if ($scope.tankowaniaZOstrzezeniami.length == 0) {
            $scope.czySaOstrzezenia = false;
        }
    }

    $scope.sprawdzCzySaTankowania = function () {
        if ($scope.zaimportowaneTankowania.length == 0) {
            $scope.czySaTankowania = false;
        }
    }

    $scope.sprawdzCzySaInneZdarzenia = function () {
        if ($scope.inneZdarzenia.length == 0) {
            $scope.czySaInneZdarzenia = false;
        }
    }

    $scope.czyPokazacOpisDodatkowy = function () {
        if ($scope.dostawa == "DKV") {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});