app.service('pomiarySerwis', function () {

    var pomiary =
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
                'lewy': 625,
                'prawy': 625,
                'lacznie': 1250,
                'sposobPomiaru': 'Dotankowano do pełna [L]'
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
                'lewy': 15,
                'prawy': 20,
                'lacznie': 320.17,
                'sposobPomiaru': 'Pomiar ręczny [cm]'
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
                'lewy': 125.78,
                'prawy': 325.14,
                'lacznie': 450.92,
                'sposobPomiaru': 'Zmierzono ilość [L]'
            },
        ]

    this.dajPomiary = function(){
        return pomiary;
    }

});