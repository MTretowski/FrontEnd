app.controller('dodajTankowanieKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Dodaj tankowanie';
    $scope.akceptuj = 'Dodaj';
    $scope.data;
    $scope.godzina

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});