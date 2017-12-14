app.service('pomiarySerwis', function () {

    let pomiary =
        [
            {
                'idPomiaru': 1,
                'dataPomiaru': new Date("2017-02-13"),
                'zbiornikLewyCm': null,
                'zbiornikPrawyCm': null,
                'zbiornikLewyLitry': null,
                'zbiornikPrawyLitry': null,
                'zbiornikLewyLitryDotankowane': 100,
                'zbiornikPrawyLitryDotankowane': 100,
                'lacznieLitry': null,
                'lacznieLitryDotankowane': null,
                'pomiarReczny': false,
                'dotankowanoDoPelna': true,
                'zmierzonoIlosc': false,
                'idPojazdu': 1,
                'numerRejestracyjnyPojazdu': 'WPR2699M',
                'trasaRozpoczynana': '101/2017',
                'trasaKonczona': '102/2017',
                'lewy': 625,
                'prawy': 625,
                'lacznie': 1250,
            },
            {
                'idPomiaru': 2,
                'dataPomiaru': new Date("2017-02-13"),
                'zbiornikLewyCm': 15,
                'zbiornikPrawyCm': 20,
                'zbiornikLewyLitry': null,
                'zbiornikPrawyLitry': null,
                'zbiornikLewyLitryDotankowane': null,
                'zbiornikPrawyLitryDotankowane': null,
                'lacznieLitry': null,
                'lacznieLitryDotankowane': null,
                'pomiarReczny': true,
                'dotankowanoDoPelna': false,
                'zmierzonoIlosc': false,
                'idPojazdu': 2,
                'numerRejestracyjnyPojazdu': 'WWY55119',
                'trasaRozpoczynana': '101/2017',
                'trasaKonczona': null,
                'lewy': 180,
                'prawy': 120,
                'lacznie': 300,
            },
            {
                'idPomiaru': 3,
                'dataPomiaru': new Date("2017-02-14"),
                'zbiornikLewyCm': null,
                'zbiornikPrawyCm': null,
                'zbiornikLewyLitry': 125.78,
                'zbiornikPrawyLitry': 325.14,
                'zbiornikLewyLitryDotankowane': null,
                'zbiornikPrawyLitryDotankowane': null,
                'lacznieLitry': null,
                'lacznieLitryDotankowane': null,
                'pomiarReczny': false,
                'dotankowanoDoPelna': false,
                'zmierzonoIlosc': true,
                'idPojazdu': 2,
                'numerRejestracyjnyPojazdu': 'WWY55119',
                'trasaRozpoczynana': null,
                'trasaKonczona': '101/2017',
                'lewy': 125.78,
                'prawy': 325.14,
                'lacznie': 450.92,
            },
        ];

    this.dajPomiary = function(){
        return pomiary;
    }

});