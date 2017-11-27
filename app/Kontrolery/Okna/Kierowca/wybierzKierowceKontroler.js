app.controller('wybierzKierowceKontroler', function ($uibModalInstance, $rootScope, $scope, numerKierowcyWZalodze, kierowcySerwis) {

    $scope.kierowcy = kierowcySerwis.dajKierowcow();

    $scope.wybrano= function (numerKierowcy){
        $rootScope.$broadcast('wybranoKierowce', numerKierowcyWZalodze, $scope.kierowcy[numerKierowcy].idKierowcy,
            ($scope.kierowcy[numerKierowcy].nazwisko + ' ' + $scope.kierowcy[numerKierowcy].imie));
        $uibModalInstance.dismiss('cancel');
    }

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});