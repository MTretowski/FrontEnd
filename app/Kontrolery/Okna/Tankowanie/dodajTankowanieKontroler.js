app.controller('dodajTankowanieKontroler', function ($uibModalInstance, $uibModal, $rootScope, $scope) {
    $scope.tytul = 'Dodaj tankowanie';
    $scope.akceptuj = 'Dodaj';
    var teraz = new Date();
    var terazUTC = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(),  teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    terazUTC.setUTCHours(12,0,0,0);
    $scope.data = terazUTC;
    $scope.pojazd = null;
    $scope.idPojazdu = null;

    $scope.wybierzPojazd = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoWybierzPojazd.html',
            controller: 'wybierzPojazdKontroler',
            backdrop: 'static'
        });
    }

    $rootScope.$on('wybranoPojazd', function (zdarzenie, obiektPojazd) {
        $scope.pojazd = obiektPojazd.numerRejestracyjny;
        $scope.idPojazdu = obiektPojazd.idPojazdu;
    })


    $scope.usunPojazd = function () {
        $scope.pojazd = null;
        $scope.idPojazdu = null;
    }

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});