app.controller('trasyKontroler', ['$cookieStore','$rootScope', '$scope', function ($cookieStore,$rootScope, $scope) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    $scope.sprawdzUprawnienia = function () {
        if ( $cookieStore.get('rolaUzytkownika') ) {
            return $cookieStore.get('rolaUzytkownika')
        } else {
            return '';
        }
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
                'kierowca': 'Adam Nowak',
                'dataRozpoczecia': new Date("2017-04-06"),
                'dataZakonczenia': new Date("2017-07-29"),
                'spalanieFakt': 30,
                'spalanieGPS': 28.30,
                'roznica': -2.20,
                'dystans': 38235
            }
        ]
}]);