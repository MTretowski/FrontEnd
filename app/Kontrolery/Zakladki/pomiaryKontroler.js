app.controller('pomiaryKontroler', function ($scope, $uibModal, pomiarySerwis) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    $scope.pomiary = pomiarySerwis.dajPomiary();

    var teraz = new Date();
    var dzisiaj = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(),  teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    var rokTemu = new Date(teraz.getUTCFullYear()-1, teraz.getUTCMonth(), teraz.getUTCDate(),  teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    dzisiaj.setUTCHours(23,59,59);
    rokTemu.setUTCHours(0,0,0);
    $scope.filtrDataOd = rokTemu;
    $scope.filtrDataDo = dzisiaj;

    $scope.dodajPomiar = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoPomiar.html',
            controller: 'dodajPomiarKontroler',
            backdrop  : 'static'
        });
    };

    $scope.edytujPomiar = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoPomiar.html',
            controller: 'edytujPomiarKontroler',
            backdrop  : 'static'
        });
    };

    $scope.usunPomiar = function(indeks){
        alert('usuwam pomiar o numerze ' + indeks);
    }


});