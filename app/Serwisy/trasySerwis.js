app.service('trasySerwis', function () {

    let trasy =
        [
            {
                'idTrasy': 1,
                'numerPoleceniaWyjazdu': '12/2017',
                'dataRozpoczecia': new Date("2017-01-01"),
                'dataZakonczenia': new Date("2017-01-31"),
                'przejechaneKilometry': 14523,
                'paliwoZuzyteCAN': 1000,
                'paliwoZuzyteWebasto': 20,
                'srednieSpalanieWgGPS': 30.50,
                'srednieSpalanieFaktyczne': 20.50,
                'komentarz': 'testowy komentarz',
                'idPojazdu': 1,
                'idPomiaruPoczatkowego': 1,
                'idPomiaruKoncowego': 2,
                'numerRejestracyjnyPojazdu': 'WPR2699M',
                'kierowca1': 'Test Testowy',
                'idKierowcy1': 2,
                'kierowca2': '-',
                'idKierowcy2': null
            },
            {
                'idTrasy': 2,
                'numerPoleceniaWyjazdu': '101/2017',
                'dataRozpoczecia': new Date("2017-04-06"),
                'dataZakonczenia': new Date("2017-07-29"),
                'przejechaneKilometry': 38235,
                'paliwoZuzyteCAN': 500,
                'paliwoZuzyteWebasto': 0.1,
                'srednieSpalanieWgGPS': 28.30,
                'srednieSpalanieFaktyczne': 30,
                'komentarz': 'kolejny testowy komentarz',
                'idPojazdu': 2,
                'idPomiaruPoczatkowego': 2,
                'idPomiaruKoncowego': 3,
                'numerRejestracyjnyPojazdu': 'WWY55119',
                'kierowca1': 'Adam Nowak',
                'idKierowcy1': 1,
                'kierowca2': 'Test Testowy',
                'idKierowcy2': 2,
            }
        ];

    this.dajTrasy = function(){
        return trasy
    }

});