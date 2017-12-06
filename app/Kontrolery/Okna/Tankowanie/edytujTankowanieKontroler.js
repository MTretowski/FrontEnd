app.controller('edytujTankowanieKontroler', function ($uibModalInstance, $uibModal, $rootScope, $scope, czyEdycjaImportowanego, edytowaneTankowanie, slownik, slowaKluczowe) {
    $scope.tytul = 'Edytuj tankowanie';
    $scope.akceptuj = 'Zapisz zmiany';
    $scope.czyEdycjaImportowanego = czyEdycjaImportowanego;

    $scope.waluty = ['PLN','EUR','GBP','HUF','CHF','RUB','CZK'];

    $scope.pojazd = edytowaneTankowanie.pojazd;
    $scope.data = edytowaneTankowanie.data;
    $scope.dostawca = edytowaneTankowanie.dostawca;
    $scope.ilosc = edytowaneTankowanie.ilosc;
    $scope.kwota = edytowaneTankowanie.kwota;
    $scope.waluta = edytowaneTankowanie.waluta;
    $scope.slownik = slownik.toString();
    $scope.slowaKluczowe = slowaKluczowe.toString();

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});