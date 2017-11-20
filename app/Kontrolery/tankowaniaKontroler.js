app.controller('tankowaniaKontroler', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;


    $rootScope.tankowania =
        [
            {
                'pojazd': 'WPR74904',
                'data': '01.01.2017',
                'ilosc': '330,00',
                'cena': '3,56',
                'waluta': 'PLN',
                'dostawca': 'Agro-Handlowiec'
            },
            {
                'pojazd': 'WPR74906',
                'data': '02.01.2017',
                'ilosc': '150,00',
                'cena': '1,01',
                'waluta': 'EUR',
                'dostawca': 'E100'
            }
        ]
}])