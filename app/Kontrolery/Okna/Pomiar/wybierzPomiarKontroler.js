app.controller('wybierzPomiarKontroler', function ($uibModalInstance, $rootScope, $scope, pomiarySerwis, rodzajPomiaru, idPojazdu) {

    $scope.pomiary = pomiarySerwis.dajPomiary();
    $scope.idPojazdu = idPojazdu;
    $scope.rodzajPomiaru = rodzajPomiaru;

    let teraz = new Date();
    let terazUTC = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(), teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    let rokTemu = new Date(teraz.getUTCFullYear() - 1, teraz.getUTCMonth(), teraz.getUTCDate(), teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    terazUTC.setUTCHours(23, 59, 59);
    rokTemu.setUTCHours(0, 0, 0);
    $scope.filtrDataOd = rokTemu;
    $scope.filtrDataDo = terazUTC;

    $scope.wybrano = function (numerPomiaru) {
        $rootScope.$broadcast('wybranoPomiar', rodzajPomiaru, $scope.pomiary[numerPomiaru].idPomiaru, $scope.pomiary[numerPomiaru].dataPomiaru, $scope.pomiary[numerPomiaru].lacznie);
        $uibModalInstance.dismiss('cancel');
    };

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});