app.controller('kierowcyKontroler', function ($scope, $uibModal, kierowcySerwis) {
    $scope.kluczSortowania = '';
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    $scope.filtrImie = '';
    $scope.filtrNazwisko = '';
    $scope.filtrPokazNieaktywnych = false;

    $scope.kierowcy = kierowcySerwis.dajKierowcow();

    $scope.dodajKierowce = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoKierowca.html',
            controller: 'dodajKierowceKontroler',
            backdrop: 'static'
        });
    };

    $scope.edytujKierowce = function (indeks) {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoKierowca.html',
            controller: 'edytujKierowceKontroler',
            backdrop: 'static',
            resolve: {
                edytowanyKierowca: function () {
                    return $scope.kierowcy[indeks];
                }
            }
        });
    };

    $scope.usunKierowce = function (indeks) {
        alert('usuwam kierowce o numerze ' + indeks);
    }


});