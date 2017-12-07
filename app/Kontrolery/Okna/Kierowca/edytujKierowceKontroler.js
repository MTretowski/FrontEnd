app.controller('edytujKierowceKontroler', function ($uibModalInstance, $scope, edytowanyKierowca) {
    $scope.tytul = 'Edytuj kierowcę';
    $scope.akceptuj = 'Zapisz zmiany';

    $scope.imie = edytowanyKierowca.imie;
    $scope.nazwisko = edytowanyKierowca.nazwisko;

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

