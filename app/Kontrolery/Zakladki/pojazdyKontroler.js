app.controller('pojazdyKontroler', function ($scope, $uibModal, pojazdySerwis) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;
    $scope.zbiornikiTakieSame = false;

    $scope.pojazdy = pojazdySerwis.dajPojazdy();

    $scope.dodajPojazd = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoPojazd.html',
            controller: 'dodajPojazdKontroler',
            backdrop  : 'static'
        });
    };

    $scope.edytujPojazd = function (indeks) {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoPojazd.html',
            controller: 'edytujPojazdKontroler',
            backdrop  : 'static',
            resolve: {
                edytowanyPojazd: function(){
                    return $scope.pojazdy[indeks];
                }
            }
        });
    };

    $scope.usunPojazd = function (indeks) {
        alert('usuwam pojazd o numerze ' + indeks);
    }

});