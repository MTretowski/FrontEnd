app.controller('tankowaniaKontroler', ['$rootScope', '$scope', '$uibModal', function ($rootScope, $scope, $uibModal) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    $scope.dodajTankowanie = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowanie.html',
            controller: 'dodajTankowanieKontroler'
        });
    };

    $scope.edytujTankowanie = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTankowanie.html',
            controller: 'edytujTankowanieKontroler'
        });
    };


    $rootScope.tankowania =
        [
            {
                'pojazd': 'WPR74904',
                'data': new Date("2017-01-01"),
                'ilosc': 330.01,
                'cena': 3.56,
                'waluta': 'PLN',
                'dostawca': 'Agro-Handlowiec'
            },
            {
                'pojazd': 'WPR74906',
                'data': new Date("2017-01-07"),
                'ilosc': 150.10,
                'cena': 1.01,
                'waluta': 'EUR',
                'dostawca': 'E100'
            }
        ]
}]);