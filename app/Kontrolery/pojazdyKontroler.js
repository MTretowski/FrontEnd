app.controller('pojazdyKontroler', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;
    $scope.zbiornikiTakieSame = false;

    $rootScope.pojazdy =
        [
            {
                'numerRejestracyjny': 'WPR 2699M',
                'marka': 'Scania R450',
                'norma': 27.9,
                'odchylenie': 1.5
            },
            {
                'numerRejestracyjny': 'WWY 55119',
                'marka': 'DAF XF 105',
                'norma': 29.4,
                'odchylenie': 0.8
            }
        ]
}]);