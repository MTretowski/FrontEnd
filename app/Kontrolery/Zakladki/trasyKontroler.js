app.controller('trasyKontroler', function ($scope, $uibModal, trasySerwis) {
    $scope.kluczSortowania = null;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    $scope.filtrNumerRejestracyjny = '';
    $scope.filtrKierowca1 = '';
    $scope.filtrKierowca2 = '';
    $scope.filtrNumerPoleceniaWyjazdu= '';

    $scope.trasy = trasySerwis.dajTrasy();
    
    let teraz = new Date();
    let terazUTC = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(),  teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    let rokTemu = new Date(teraz.getUTCFullYear()-1, teraz.getUTCMonth(), teraz.getUTCDate(),  teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    terazUTC.setUTCHours(23,59,59);
    rokTemu.setUTCHours(0,0,0);
    $scope.filtrDataRozpoczeciaOd = rokTemu;
    $scope.filtrDataRozpoczeciaDo = terazUTC;
    $scope.filtrDataZakonczeniaOd = rokTemu;
    $scope.filtrDataZakonczeniaDo = terazUTC;


    $scope.dodajTrase = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTrasa.html',
            controller: 'dodajTraseKontroler',
            backdrop  : 'static',
            size: 'lg'
        });
    };

    $scope.edytujTrase = function (indeks) {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoTrasa.html',
            controller: 'edytujTraseKontroler',
            backdrop  : 'static',
            size: 'lg',
            resolve: {
                edytowanaTrasa: function(){
                    return $scope.trasy[indeks];
                }
            }
        });
    };

    $scope.usunTrase = function(indeks){
        alert('usuwam trase o numerze ' + indeks);
    }
});