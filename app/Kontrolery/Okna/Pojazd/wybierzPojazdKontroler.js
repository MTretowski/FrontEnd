app.controller('wybierzPojazdKontroler', function ($uibModalInstance, $rootScope, $scope, pojazdySerwis) {

    $scope.pojazdy = pojazdySerwis.dajPojazdy()

    $scope.wybrano= function (numerPojazdu){
        $rootScope.$broadcast('wybranoPojazd', $scope.pojazdy[numerPojazdu].idPojazdu, $scope.pojazdy[numerPojazdu].numerRejestracyjny);
        $uibModalInstance.dismiss('cancel');
    }

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});