app.controller('resetujHasloKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Reset hasła';
    $scope.tekstPrzyciskuAkceptuj = 'Resetuj hasło';
    $scope.zmianaHasla = false;

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});