app.controller('UzytkownikKontroler', ['$rootScope','$scope', function ($rootScope, $scope) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    $rootScope.rolaUzytkownika;

    $scope.sprawdzUprawnienia = function(){
        return $rootScope.rolaUzytkownika;
    }
    $scope.tankowania =
        [
            {
                'Data': '01.01.2017',
                'Ilosc': '300,00',
                'Dostawca': 'Agro-Handlowiec'
            },
            {
                'Data': '02.01.2017',
                'Ilosc': '150,00',
                'Dostawca': 'E100'
            }
        ]
    $scope.trasy =
        [
            {
                'Samochod': 'WPR74903',
                'Kierowca': 'Test Testowy',
                'DataRozpoczecia': '01.01.2017',
                'DataZakonczenia': '31.01.2017',
                'SpalanieFakt': '20,50',
                'SpalanieGPS': '30,50',
                'Roznica': '10,00',
                'Dystans': '14 523',
            },
            {
                'Samochod': 'WPR74905',
                'Kierowca': 'Adam Nowak',
                'DataRozpoczecia': '06.04.2017',
                'DataZakonczenia': '29.07.2017',
                'SpalanieFakt': '30,50',
                'SpalanieGPS': '28,30',
                'Roznica': '-2,20',
                'Dystans': '38 235',
            }
        ]
}
]);