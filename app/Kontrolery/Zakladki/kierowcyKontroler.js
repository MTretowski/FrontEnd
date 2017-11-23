app.controller('kierowcyKontroler', ['$rootScope', '$scope', '$uibModal', function ($rootScope, $scope, $uibModal) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    $scope.dodajKierowce = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoKierowca.html',
            controller: 'dodajKierowceKontroler'
        });
    };

    $scope.edytujKierowce = function (indeks) {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoKierowca.html',
            controller: 'edytujKierowceKontroler'
        });
    };

    $scope.usunKierowce = function(indeks){
        alert('usuwam kierowce o numerze ' + indeks);
    }

    $rootScope.kierowcy =
        [
            {
                'imie': 'Test',
                'nazwisko': 'Testowy'
            },
            {
                'imie': 'Adam',
                'nazwisko': 'Nowak'
            }
        ]
}]);