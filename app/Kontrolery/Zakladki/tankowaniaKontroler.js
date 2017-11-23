app.controller('tankowaniaKontroler', ['$rootScope', '$scope', '$uibModal', function ($rootScope, $scope, $uibModal) {
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

    $scope.usunTankowanie = function(indeks){
        alert('usuwam tankowanie o numerze ' + indeks);
    }

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