app.controller('dodajPojazdKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Dodaj pojazd';
    $scope.akceptuj = 'Dodaj';

    $scope.numerRejestracyjny = null;
    $scope.markaIModel = null;
    $scope.przelicznikZbiornikLewy = null;
    $scope.przelicznikZbiornikPrawy = null;
    $scope.maxPojemnoscZbiornikLewy = null;
    $scope.maxPojemnoscZbiornikPrawy = null;
    $scope.statusAktywnosci = '';

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});