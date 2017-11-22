app.controller('edytujKierowceKontroler', function ($uibModalInstance, $scope) {
    $scope.resetHasla = false;
    $scope.tytul = 'Edytuj kierowcę';
    $scope.akceptuj = 'Zapisz zmiany';

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

