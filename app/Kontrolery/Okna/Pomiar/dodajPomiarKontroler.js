app.controller('dodajPomiarKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Dodaj pomiar';
    $scope.akceptuj = 'Dodaj';

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});