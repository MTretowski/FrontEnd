app.controller('uzytkownicyKontroler', function ($scope, $uibModal, uzytkownicySerwis) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    $scope.uzytkownicy = uzytkownicySerwis.dajUzytkownikow();

    $scope.dodajUzytkownika = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoUzytkownik.html',
            controller: 'dodajUzytkownikaKontroler',
            backdrop: 'static'
        });
    };

    $scope.edytujUzytkownika = function (indeks) {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoUzytkownik.html',
            controller: 'edytujUzytkownikaKontroler',
            backdrop: 'static',
            resolve: {
                edytowanyUzytkownik: function () {
                    return $scope.uzytkownicy[indeks]
                }
            }
        });
    };

    $scope.usunUzytkownika = function (indeks) {
        alert('usuwam uzytkownika o numerze ' + indeks);
    }
});