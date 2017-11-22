app.controller('pomiaryKontroler', ['$rootScope', '$scope', '$uibModal', function ($rootScope, $scope, $uibModal) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    $scope.dodajPomiar = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoPomiar.html',
            controller: 'dodajPomiarKontroler'
        });
    };

    $scope.edytujPomiar = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoPomiar.html',
            controller: 'edytujPomiarKontroler'
        });
    };


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