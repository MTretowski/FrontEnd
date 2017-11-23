app.controller('trasyKontroler', ['$cookieStore', '$rootScope', '$scope', '$uibModal', function ($cookieStore, $rootScope, $scope, $uibModal) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;
    
    var teraz = new Date();
    var dzisiaj = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(),  teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    var rokTemu = new Date(teraz.getUTCFullYear()-1, teraz.getUTCMonth(), teraz.getUTCDate(),  teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    dzisiaj.setUTCHours(23,59,59);
    rokTemu.setUTCHours(00,00,00);
    $scope.filtrDataRozpoczeciaOd = rokTemu;
    $scope.filtrDataRozpoczeciaDo = dzisiaj;
    $scope.filtrDataZakonczeniaOd = rokTemu;
    $scope.filtrDataZakonczeniaDo = dzisiaj;


    $scope.dodajTrase = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTrasa.html',
            controller: 'dodajTraseKontroler',
            size: 'lg'
        });
    };

    $scope.edytujTrase = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTrasa.html',
            controller: 'edytujTraseKontroler',
            size: 'lg'
        });
    };

    $scope.usunTrase = function(indeks){
        alert('usuwam trase o numerze ' + indeks);
    }

    $rootScope.trasy =
        [
            {
                'pojazd': 'WPR74903',
                'kierowca': 'Test Testowy',
                'dataRozpoczecia': new Date("2017-01-01"),
                'dataZakonczenia': new Date("2017-01-31"),
                'spalanieFakt': 20.50,
                'spalanieGPS': 30.50,
                'roznica': 10.00,
                'dystans': 14523
            },
            {
                'pojazd': 'WPR74905',
                'kierowca': 'Adam terazak',
                'dataRozpoczecia': new Date("2017-04-06T23:59"),
                'dataZakonczenia': new Date("2017-07-29"),
                'spalanieFakt': 30,
                'spalanieGPS': 28.30,
                'roznica': -2.20,
                'dystans': 38235
            }
        ]
}]);