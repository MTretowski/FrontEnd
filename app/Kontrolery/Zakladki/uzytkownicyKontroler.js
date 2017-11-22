app.controller('uzytkownicyKontroler', ['$rootScope', '$scope', '$uibModal', function ($rootScope, $scope, $uibModal) {
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

    $scope.uzytkownicy =
        [
            {
                'imie': 'Admin',
                'nazwisko': 'Administracyjny',
                'email':'admin@admin.pl',
                'rola':'Administrator'
            },
            {
                'imie': 'Użytkownik',
                'nazwisko': 'Użykownikowy',
                'email':'uzytkownik@uzytkownik.pl',
                'rola':'Użytkownik'
            }
        ]
}]);