app.controller('pomiaryKontroler', ['$rootScope', '$scope', '$uibModal', function ($rootScope, $scope, $uibModal) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    var teraz = new Date();
    var dzisiaj = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(),  teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    var rokTemu = new Date(teraz.getUTCFullYear()-1, teraz.getUTCMonth(), teraz.getUTCDate(),  teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    dzisiaj.setUTCHours(23,59,59);
    rokTemu.setUTCHours(00,00,00);
    $scope.filtrDataOd = rokTemu;
    $scope.filtrDataDo = dzisiaj;

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

    $scope.usunPomiar = function(indeks){
        alert('usuwam pomiar o numerze ' + indeks);
    }

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