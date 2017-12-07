app.controller('wybierzKierowceKontroler', function ($uibModalInstance, $rootScope, $scope, numerKierowcyWZalodze, kierowcySerwis) {

    $scope.kierowcy = kierowcySerwis.dajKierowcow();

    $scope.wybrano= function (numerKierowcy){
        $rootScope.$broadcast('wybranoKierowce', numerKierowcyWZalodze, $scope.kierowcy[numerKierowcy]);
        $uibModalInstance.dismiss('cancel');
    }

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});