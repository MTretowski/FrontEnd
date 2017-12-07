app.controller('edytujUzytkownikaKontroler', function ($uibModalInstance, $uibModal, $scope, edytowanyUzytkownik) {
    $scope.tytul = 'Edytuj użytkownika';
    $scope.akceptuj = 'Zapisz zmiany';
    $scope.trybEdycji = true;

    $scope.imie = edytowanyUzytkownik.imie;
    $scope.nazwisko = edytowanyUzytkownik.nazwisko;
    $scope.login = edytowanyUzytkownik.login;
    $scope.nazwaRoli = edytowanyUzytkownik.nazwaRoli;
    $scope.statusAktywnosci = '';
    {
        if (edytowanyUzytkownik.czyAktywny) {
            $scope.statusAktywnosci = 'aktywny';
        }
        else {
            $scope.statusAktywnosci = 'nieaktywny';
        }
    }

    $scope.resetujHaslo = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoHaslo.html',
            controller: 'resetujHasloKontroler',
            backdrop: 'static',
            size: 'sm'
        });
    };

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});