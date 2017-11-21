app.controller('uzytkownicyKontroler', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.kluczSortowania;
    $scope.odwrotneSortowanie = false;
    $scope.pokazFiltry = false;
    $scope.resetHasla = false;

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