app.controller('trasyKontroler', function ($scope, $uibModal, trasySerwis) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    $scope.trasy = trasySerwis.dajTrasy()
    
    var teraz = new Date();
    var dzisiaj = new Date(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate(),  teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    var rokTemu = new Date(teraz.getUTCFullYear()-1, teraz.getUTCMonth(), teraz.getUTCDate(),  teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
    dzisiaj.setUTCHours(23,59,59);
    rokTemu.setUTCHours(0,0,0);
    $scope.filtrDataRozpoczeciaOd = rokTemu;
    $scope.filtrDataRozpoczeciaDo = dzisiaj;
    $scope.filtrDataZakonczeniaOd = rokTemu;
    $scope.filtrDataZakonczeniaDo = dzisiaj;


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
                edytowanaTrasaIndeks: function(){
                    return indeks;
                }
            }
        });
    };

    $scope.usunTrase = function(indeks){
        alert('usuwam trase o numerze ' + indeks);
    }
});