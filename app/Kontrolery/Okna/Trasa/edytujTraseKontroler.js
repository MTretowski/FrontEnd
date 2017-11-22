app.controller('edytujTraseKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Edytuj trasę';
    $scope.akceptuj = 'Zapisz zmiany';

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});