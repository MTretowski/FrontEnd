app.service('trasySerwis', function () {

    var trasy =
        [
            {
                'idTrasy': 1,
                'numerTrasy': '12/2017',
                'dataRozpoczecia': new Date("2017-01-01"),
                'dataZakonczenia': new Date("2017-01-31"),
                'paliwoZuzyteCAN': 1000,
                'paliwoZuzyteWebasto': 20,
                'srednieSpalanieFaktyczne': 20.50,
                'srednieSpalanieGPS': 30.50,
                'odchylenieOdNormy': 10.00,
                'przejechaneKilometry': 14523,
                'komentarz': 'testowy komentarz',
                'idPojazu': 1,
                'numerRejestracyjnyPojazdu': 'WPR2699M',
                'kierowca1': 'Test Testowy',
                'kierowca2': '-',
            },
            {
                'idTrasy': 2,
                'numerTrasy': '101/2017',
                'dataRozpoczecia': new Date("2017-04-06"),
                'dataZakonczenia': new Date("2017-07-29"),
                'paliwoZuzyteCAN': 500,
                'paliwoZuzyteWebasto': 0.1,
                'srednieSpalanieFaktyczne': 30,
                'srednieSpalanieGPS': 28.30,
                'odchylenieOdNormy': -2.20,
                'przejechaneKilometry': 38235,
                'komentarz': 'kolejny testowy komentarz',
                'idPojazdu': 2,
                'numerRejestracyjnyPojazdu': 'WWY55119',
                'kierowca1': 'Adam Nowak',
                'kierowca2': 'Test Testowy'
            }
        ]

    this.dajTrasy = function(){
        return trasy
    }

});