app.controller('edytujTankowanieKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Edytuj tankowanie';
    $scope.akceptuj = 'Zapisz zmiany';

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});