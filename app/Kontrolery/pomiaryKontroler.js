app.controller('pomiaryKontroler', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    $rootScope.pomiary =
        [
            {
                'pojazd': 'WPR2694M',
                'data': new Date("2017-02-13"),
                'sposob': 'Ręcznie (miarka)',
                'lewy': 10.00,
                'prawy': 15.50
            },
            {
                'pojazd': 'WPR2695M',
                'data': new Date("2017-07-06"),
                'sposob': 'Dotankowanie do pełna',
                'lewy': 123.54,
                'prawy': 423.15
            }
        ]
}]);