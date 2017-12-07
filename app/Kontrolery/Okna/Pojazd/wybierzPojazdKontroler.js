app.controller('wybierzPojazdKontroler', function ($uibModalInstance, $uibModal, $rootScope, $scope, pojazdySerwis) {

    $scope.pojazdy = pojazdySerwis.dajPojazdy()

    $scope.wybrano= function (numerPojazdu){
        $rootScope.$broadcast('wybranoPojazd', $scope.pojazdy[numerPojazdu]);
        $uibModalInstance.dismiss('cancel');
    }

    $scope.dodajPojazd = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoPojazd.html',
            controller: 'dodajPojazdKontroler',
            backdrop  : 'static'
        });
    };

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});