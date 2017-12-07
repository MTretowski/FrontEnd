app.controller('dodajPomiarKontroler', function ($uibModalInstance, $uibModal, $rootScope, $scope) {
    $scope.tytul = 'Dodaj pomiar';
    $scope.akceptuj = 'Dodaj';
    var teraz = new Date();
    var terazUTC = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(),  teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    terazUTC.setUTCHours(12,0,0,0);
    $scope.data = terazUTC;
    $scope.pojazd = null;

    $scope.sposobPomiaru = 'brakPojazdu';

    $scope.zbiornikLewy = 0;
    $scope.zbiornikPrawy = 0;
    $scope.litryLacznie = 0

    $scope.wybranoSposobPomiaru = function(){
        if($scope.sposobPomiaru == 'recznie'){
            if($scope.pojazd.przelicznikZbiornikLewy == null || $scope.pojazd.przelicznikZbiornikPrawy == null){
                alert("Nie można wybrać tego sposobu pomiaru.\nNie zdefiniowano przeliczników dla zbiorników w tym pojeździe.");
                $scope.sposobPomiaru = '';
            }
        }
        else if($scope.sposobPomiaru == 'dotankowano'){
            if($scope.pojazd.maxPojemnoscZbiornikLewy == null || $scope.pojazd.maxPojemnoscZbiornikPrawy == null){
                alert("Nie można wybrać tego sposobu pomiaru.\nNie zdefiniowano maksymalnych pojemności dla zbiorników w tym pojeździe");
                $scope.sposobPomiaru = '';
            }
        }
    };

    $scope.wybierzPojazd = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoWybierzPojazd.html',
            controller: 'wybierzPojazdKontroler',
            backdrop: 'static'
        });
    };

    $rootScope.$on('wybranoPojazd', function (zdarzenie, obiektPojazd) {
        $scope.pojazd = obiektPojazd;
        $scope.sposobPomiaru = '';
    });

    $scope.usunPojazd = function () {
        $scope.pojazd = null;
        $scope.sposobPomiaru = 'brakPojazdu'
    };

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});