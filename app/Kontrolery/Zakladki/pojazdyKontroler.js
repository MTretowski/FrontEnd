app.controller('pojazdyKontroler', ['$rootScope', '$scope', '$uibModal', function ($rootScope, $scope, $uibModal) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;
    $scope.zbiornikiTakieSame = false;

    $scope.dodajPojazd = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoPojazd.html',
            controller: 'dodajPojazdKontroler'
        });
    };

    $scope.edytujPojazd = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoPojazd.html',
            controller: 'edytujPojazdKontroler'
        });
    };

    $scope.usunPojazd = function(indeks){
        alert('usuwam pojazd o numerze ' + indeks);
    }

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