app.controller('edytujUzytkownikaKontroler', function ($uibModalInstance, $uibModal, $scope) {
    $scope.tytul = 'Edytuj użytkownika';
    $scope.akceptuj = 'Zapisz zmiany';
    $scope.mozliwyResetHasla = true;

    $scope.resetujHaslo = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoHaslo.html',
            controller: 'resetujHasloKontroler',
            backdrop  : 'static',
            size: 'sm'
        });
    };

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});