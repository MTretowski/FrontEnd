app.controller('edytujPomiarKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Edytuj pomiar';
    $scope.akceptuj = 'Zapisz zmiany';

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});