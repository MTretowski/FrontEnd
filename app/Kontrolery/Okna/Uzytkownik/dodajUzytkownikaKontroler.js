app.controller('dodajUzytkownikaKontroler', function ($uibModalInstance, $scope) {
    $scope.tytul = 'Dodaj użytkownika';
    $scope.akceptuj = 'Dodaj';
    $scope.trybEdycji = false;

    $scope.imie = null;
    $scope.nazwisko = null;
    $scope.login = null;
    $scope.haslo = null;
    $scope.rola = '';
    $scope.statusAktywnosci = ''

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});