app.controller('wybierzPomiarKontroler', function ($uibModalInstance, $rootScope, $scope, pomiarySerwis, rodzajPomiaru, idPojazdu) {

    $scope.pomiary = pomiarySerwis.dajPomiary();
    $scope.idPojazdu = idPojazdu;

    var teraz = new Date();
    var terazUTC = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(), teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    var rokTemu = new Date(teraz.getUTCFullYear() - 1, teraz.getUTCMonth(), teraz.getUTCDate(), teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    terazUTC.setUTCHours(23, 59, 59);
    rokTemu.setUTCHours(0, 0, 0);
    $scope.filtrDataOd = rokTemu;
    $scope.filtrDataDo = terazUTC;

    $scope.wybrano = function (numerPomiaru) {
        $rootScope.$broadcast('wybranoPomiar', rodzajPomiaru, $scope.pomiary[numerPomiaru].idPomiaru, $scope.pomiary[numerPomiaru].dataPomiaru, $scope.pomiary[numerPomiaru].lacznie);
        $uibModalInstance.dismiss('cancel');
    }

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});