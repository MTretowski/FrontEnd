app.controller('dodajKierowceKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Dodaj kierowcę';
    $scope.akceptuj = 'Dodaj';

    $scope.imie = null;
    $scope.nazwisko = null;

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

