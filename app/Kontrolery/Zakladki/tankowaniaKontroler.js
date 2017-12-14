app.controller('tankowaniaKontroler', function ($scope, $uibModal, tankowaniaSerwis) {
    $scope.kluczSortowania = '';
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    $scope.filtrDostawca = '';

    $scope.tankowania = tankowaniaSerwis.dajTankowania();

    let teraz = new Date();
    let terazUTC = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(), teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    let rokTemu = new Date(teraz.getUTCFullYear() - 1, teraz.getUTCMonth(), teraz.getUTCDate(), teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    terazUTC.setUTCHours(23, 59, 59);
    rokTemu.setUTCHours(0, 0, 0);
    $scope.filtrDataOd = rokTemu;
    $scope.filtrDataDo = terazUTC;

    $scope.dodajTankowanie = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowanie.html',
            controller: 'dodajTankowanieKontroler',
            backdrop: 'static',
        });
    };

    $scope.importujTankowania = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowaniaZPliku.html',
            controller: 'importujTankowaniaKontroler',
            backdrop: 'static',
            size: 'sm'
        });
    };

    $scope.edytujTankowanie = function (indeks) {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowanie.html',
            controller: 'edytujTankowanieKontroler',
            backdrop: 'static',
            resolve: {
                czyEdycjaImportowanego: function () {
                    return false;
                },
                edytowaneTankowanie: function () {
                    return $scope.tankowania[indeks];
                },
                slownik: function () {
                    return null;
                },
                slowaKluczowe: function () {
                    return null;
                }
            }
        });
    };

    $scope.usunTankowanie = function (indeks) {
        alert('usuwam tankowanie o numerze ' + indeks);
    }
});