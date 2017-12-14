app.controller('zmienHasloKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Zmiana hasła';
    $scope.tekstPrzyciskuAkceptuj = 'Zmień hasło';
    $scope.zmianaHasla = true;

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});