app.controller('dodajKierowceKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Dodaj kierowcę';
    $scope.akceptuj = 'Dodaj';

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

