app.service('kierowcySerwis', function () {

    var kierowcy =
        [
            {
                'idKierowcy': 1,
                'imie': 'Test',
                'nazwisko': 'Testowy',
                'czyAktywny': true,
            },
            {
                'idKierowcy': 2,
                'imie': 'Adam',
                'nazwisko': 'Nowak',
                'czyAktywny': true,
            },
            {
                'idKierowcy': 3,
                'imie': 'Krzysztof',
                'nazwisko': 'Kowalski',
                'czyAktywny': false,
            }
        ]

    this.dajKierowcow = function () {
        return kierowcy;
    }
});