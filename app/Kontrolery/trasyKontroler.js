app.controller('trasyKontroler', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    //$rootScope.tankowania;

    $scope.sprawdzUprawnienia = function () {
        return $rootScope.rolaUzytkownika;
    }

    $rootScope.trasy =
        [
            {
                'pojazd': 'WPR74903',
                'kierowca': 'Test Testowy',
                'dataRozpoczecia': '01.01.2017',
                'dataZakonczenia': '31.01.2017',
                'spalanieFakt': '20,50',
                'spalanieGPS': '30,50',
                'roznica': '10,00',
                'dystans': '14 523',
            },
            {
                'pojazd': 'WPR74905',
                'kierowca': 'Adam Nowak',
                'dataRozpoczecia': '06.04.2017',
                'dataZakonczenia': '29.07.2017',
                'spalanieFakt': '30,50',
                'spalanieGPS': '28,30',
                'roznica': '-2,20',
                'dystans': '38 235',
            }
        ]
}
]);