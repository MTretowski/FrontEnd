app.service('pojazdySerwis', function () {

    var pojazdy =
        [
            {
                'idPojazdu': 1,
                'numerRejestracyjny': 'WPR 2699M',
                'markaIModel': 'Scania R450',
                'normaSpalania': 27.9,
                'dopuszczalneOdchylenie': 1.5,
                'przelicznikZbiornikLewy': 11,
                'przelicznikZbiornikPrawy': 11,
                'maxPojemnoscZbiornikLewy': 725,
                'maxPojemnoscZbiornikPrawy': 725,
                'maxPojemnoscZbiornikow': null,
                'czyZbiornikiTakieSame': true,
                'czyAktywny': true
            },
            {
                'idPojazdu': 2,
                'numerRejestracyjny': 'WWY 55119',
                'markaIModel': 'DAF XF 105',
                'normaSpalania': 28.7,
                'dopuszczalneOdchylenie': 1.8,
                'przelicznikZbiornikLewy': 12,
                'przelicznikZbiornikPrawy': 6,
                'maxPojemnoscZbiornikLewy': null,
                'maxPojemnoscZbiornikPrawy': null,
                'maxPojemnoscZbiornikow': 1250,
                'czyZbiornikiTakieSame': false,
                'czyAktywny': true
            },
            {
                'idPojazdu': 3,
                'numerRejestracyjny': 'WWY 37889',
                'markaIModel': 'DAF XF 105',
                'normaSpalania': 30.1,
                'dopuszczalneOdchylenie': 1.95,
                'przelicznikZbiornikLewy': 12,
                'przelicznikZbiornikPrawy': 6,
                'maxPojemnoscZbiornikLewy': null,
                'maxPojemnoscZbiornikPrawy': null,
                'maxPojemnoscZbiornikow': 1250,
                'czyZbiornikiTakieSame': false,
                'czyAktywny': false
            }
        ]

    this.dajPojazdy = function(){
        return pojazdy;
    }
});