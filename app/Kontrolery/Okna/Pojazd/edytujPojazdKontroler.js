app.controller('edytujPojazdKontroler', function ($uibModalInstance, $scope, edytowanyPojazd) {
    $scope.tytul = 'Edytuj pojazd';
    $scope.akceptuj = 'Zapisz zmiany';

    $scope.numerRejestracyjny = edytowanyPojazd.numerRejestracyjny;
    $scope.markaIModel = edytowanyPojazd.markaIModel;
    $scope.przelicznikZbiornikLewy = edytowanyPojazd.przelicznikZbiornikLewy;
    $scope.przelicznikZbiornikPrawy = edytowanyPojazd.przelicznikZbiornikPrawy;
    $scope.maxPojemnoscZbiornikLewy = edytowanyPojazd.maxPojemnoscZbiornikLewy;
    $scope.maxPojemnoscZbiornikPrawy = edytowanyPojazd.maxPojemnoscZbiornikPrawy;
    $scope.statusAktywnosci = '';
    {
        if (edytowanyPojazd.czyAktywny) {
            $scope.statusAktywnosci = 'aktywny';
        }
        else {
            $scope.statusAktywnosci = 'nieaktywny';
        }
    }

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});