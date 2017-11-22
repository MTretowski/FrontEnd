app.controller('resetujHasloKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Reset hasła';
    $scope.akceptuj = 'Resetuj hasło';
    $scope.zmianaHasla = false;

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});