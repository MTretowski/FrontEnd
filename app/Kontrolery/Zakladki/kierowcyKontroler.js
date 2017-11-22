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

    $scope.edytujKierowce = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoKierowca.html',
            controller: 'edytujKierowceKontroler'
        });
    };

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