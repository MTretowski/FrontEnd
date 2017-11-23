app.controller('uzytkownicyKontroler', ['$scope', '$uibModal', function ($scope, $uibModal) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;

    $scope.dodajUzytkownika = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoUzytkownik.html',
            controller: 'dodajUzytkownikaKontroler'
        });
    };

    $scope.edytujUzytkownika = function () {
        $uibModal.open({
            templateUrl: 'Widoki/Okna/oknoUzytkownik.html',
            controller: 'edytujUzytkownikaKontroler'
        });
    };

    $scope.usunUzytkownika = function(indeks){
        alert('usuwam uzytkownika o numerze ' + indeks);
    }

    $scope.uzytkownicy =
        [
            {
                'imie': 'Admin',
                'nazwisko': 'Administracyjny',
                'login':'admin@admin.pl',
                'rola':'Administrator'
            },
            {
                'imie': 'Użytkownik',
                'nazwisko': 'Użykownikowy',
                'login':'uzytkownik@uzytkownik.pl',
                'rola':'Użytkownik'
            }
        ]
}]);