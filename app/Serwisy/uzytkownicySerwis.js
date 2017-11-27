app.service('uzytkownicySerwis', function () {

    var uzytkownicy =
        [
            {
                'imie': 'Admin',
                'nazwisko': 'Administracyjny',
                'login': 'admin@admin.pl',
                'idRoli': 1,
                'nazwaRoli': 'Administrator',
                'czyAktywny': true
            },
            {
                'imie': 'Użytkownik',
                'nazwisko': 'Użykownikowy',
                'login': 'uzytkownik@uzytkownik.pl',
                'idRoli': 2,
                'nazwaRoli': 'Uzytkownik',
                'czyAktywny': false
            }
        ]
    var role =
        [
            {
                'idRoli': 1,
                'nazwaRoli': 'Administrator'
            },
            {
                'idRoli': 2,
                'nazwaRoli': 'Użytkownik'
            }
        ]

    this.dajUzytkownikow = function () {
        return uzytkownicy
    }
});