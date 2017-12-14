app.controller('pomiaryKontroler', function ($scope, $uibModal, pomiarySerwis) {
    $scope.kluczSortowania = '';
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    $scope.pomiary = pomiarySerwis.dajPomiary();

    let teraz = new Date();
    let terazUTC = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(),  teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    let rokTemu = new Date(teraz.getUTCFullYear()-1, teraz.getUTCMonth(), teraz.getUTCDate(),  teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    terazUTC.setUTCHours(23,59,59);
    rokTemu.setUTCHours(0,0,0);
    $scope.filtrDataOd = rokTemu;
    $scope.filtrDataDo = terazUTC;

    $scope.dodajPomiar = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoPomiar.html',
            controller: 'dodajPomiarKontroler',
            backdrop  : 'static'
        });
    };

    $scope.edytujPomiar = function (indeks) {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoPomiar.html',
            controller: 'edytujPomiarKontroler',
            backdrop  : 'static',
            resolve: {
                edytowanyPomiar: function(){
                    return $scope.pomiary[indeks];
                }
            }
        });
    };

    $scope.usunPomiar = function(indeks){
        alert('usuwam pomiar o numerze ' + indeks);
    }


});