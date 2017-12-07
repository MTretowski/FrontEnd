app.service('pojazdySerwis', function () {

    var pojazdy =
        [
            {
                'idPojazdu': 1,
                'numerRejestracyjny': 'WPR2699M',
                'markaIModel': 'Scania R450',
                'przelicznikZbiornikLewy': 11,
                'przelicznikZbiornikPrawy': 11,
                'maxPojemnoscZbiornikLewy': 725,
                'maxPojemnoscZbiornikPrawy': 725,
                'czyAktywny': true
            },
            {
                'idPojazdu': 2,
                'numerRejestracyjny': 'WWY55119',
                'markaIModel': 'DAF XF 105',
                'przelicznikZbiornikLewy': 12,
                'przelicznikZbiornikPrawy': 6,
                'maxPojemnoscZbiornikLewy': null,
                'maxPojemnoscZbiornikPrawy': null,
                'czyAktywny': true
            },
            {
                'idPojazdu': 3,
                'numerRejestracyjny': 'WWY37889',
                'markaIModel': 'DAF XF 105',
                'przelicznikZbiornikLewy': 12,
                'przelicznikZbiornikPrawy': 6,
                'maxPojemnoscZbiornikLewy': null,
                'maxPojemnoscZbiornikPrawy': null,
                'czyAktywny': false
            }
        ]

    this.dajPojazdy = function(){
        return pojazdy;
    }
});