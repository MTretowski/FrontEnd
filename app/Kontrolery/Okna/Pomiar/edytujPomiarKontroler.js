app.controller('edytujPomiarKontroler', function ($uibModalInstance, $uibModal, $rootScope, $scope, edytowanyPomiar, pojazdySerwis) {
    $scope.tytul = 'Edytuj pomiar';
    $scope.akceptuj = 'Zapisz zmiany';

    $scope.pojazdy = pojazdySerwis.dajPojazdy();
    $scope.edytowanyPomiar = edytowanyPomiar;

    $scope.data = $scope.edytowanyPomiar.dataPomiaru;
    $scope.pojazd = null;

    $scope.sposobPomiaru = 'brakPojazdu';

    $scope.zbiornikLewy = 0;
    $scope.zbiornikPrawy = 0;
    $scope.litryLacznie = 0;

    {
        for(i = 0; i < $scope.pojazdy.length; i++){
            if($scope.edytowanyPomiar.idPojazdu == $scope.pojazdy[i].idPojazdu){
                $scope.pojazd = $scope.pojazdy[i];
            }
        }

        if($scope.edytowanyPomiar.pomiarReczny){
            $scope.sposobPomiaru = 'recznie';
            $scope.zbiornikLewy = $scope.edytowanyPomiar.zbiornikLewyCm;
            $scope.zbiornikPrawy = $scope.edytowanyPomiar.zbiornikPrawyCm;
        }
        else if($scope.edytowanyPomiar.dotankowanoDoPelna){
            $scope.sposobPomiaru = 'dotankowano';
            $scope.zbiornikLewy = $scope.edytowanyPomiar.zbiornikLewyLitryDotankowane;
            $scope.zbiornikPrawy = $scope.edytowanyPomiar.zbiornikPrawyLitryDotankowane;
        }
        else if(edytowanyPomiar.zmierzonoIlosc){
            $scope.sposobPomiaru = 'zmierzono';
            $scope.zbiornikLewy = $scope.edytowanyPomiar.zbiornikLewyLitry;
            $scope.zbiornikPrawy = $scope.edytowanyPomiar.zbiornikPrawyLitry;
        }
    }

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