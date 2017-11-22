app.controller('dodajTraseKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Dodaj trasę';
    $scope.akceptuj = 'Dodaj';

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});