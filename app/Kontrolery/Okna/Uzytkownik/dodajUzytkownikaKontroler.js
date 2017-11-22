app.controller('dodajUzytkownikaKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Dodaj użytkownika';
    $scope.akceptuj = 'Dodaj';
    $scope.mozliwyResetHasla = false;

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});