app.controller('dodajTankowanieKontroler', function ($uibModalInstance, $uibModal, $rootScope, $scope) {
    $scope.tytul = 'Dodaj tankowanie';
    $scope.akceptuj = 'Dodaj';
    $scope.data = new Date();
    $scope.data.setUTCHours(12, 0, 0, 0);
    $scope.pojazd = null;
    $scope.idPojazdu = null;

    $scope.wybierzPojazd = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoWybierzPojazd.html',
            controller: 'wybierzPojazdKontroler',
            backdrop  : 'static'
        });
    }

    $rootScope.$on('wybranoPojazd', function (zdarzenie, idPojazdu, numerRejestracyjnyPojazdu) {
        $scope.pojazd = numerRejestracyjnyPojazdu;
        $scope.idPojazdu = idPojazdu;
    })

    $scope.usunPojazd = function () {
        $scope.pojazd = null;
        $scope.idPojazdu = null;
    }

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});