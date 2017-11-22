app.controller('dodajPojazdKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Dodaj pojazd';
    $scope.akceptuj = 'Dodaj';

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});