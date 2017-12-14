app.service('uzytkownicySerwis', function () {

    let uzytkownicy =
        [
            {
                'imie': 'Admin',
                'nazwisko': 'Administracyjny',
                'login': 'admin',
                'idRoli': 1,
                'nazwaRoli': 'Administrator',
                'czyAktywny': true
            },
            {
                'imie': 'Użytkownik',
                'nazwisko': 'Użykownikowy',
                'login': 'uzytkownik',
                'idRoli': 2,
                'nazwaRoli': 'Uzytkownik',
                'czyAktywny': false
            }
        ];

    this.dajUzytkownikow = function () {
        return uzytkownicy
    }
});