app.controller('edytujPojazdKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Edytuj pojazd';
    $scope.akceptuj = 'Zapisz zmiany';

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});