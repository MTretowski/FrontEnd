app.controller('kierowcyKontroler', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

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