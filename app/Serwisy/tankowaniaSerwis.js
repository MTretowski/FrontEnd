app.service('tankowaniaSerwis', function () {

    let tankowania =
        [
            {
                'idTankowania': 1,
                'ilosc': 330.01,
                'kwota': 3.56,
                'waluta': 'PLN',
                'data': new Date("2017-01-01"),
                'idPojazdu': 1,
                'dostawca': 'E100',
                'pojazd': 'WPR2699M'
            },
            {
                'idTankowania': 2,
                'ilosc': 105.54,
                'kwota': 1.02,
                'waluta': 'EUR',
                'data': new Date("2017-02-01"),
                'idPojazdu': 1,
                'dostawca': 'DKV',
                'pojazd': 'WPR2699M'
            },
            {
                'idTankowania': 3,
                'ilosc': 150.10,
                'kwota': 1.01,
                'waluta': 'EUR',
                'data': new Date("2017-01-07"),
                'idPojazdu': 2,
                'dostawca': 'E100',
                'pojazd': 'WWY55119'
            }
        ];

    this.dajTankowania = function(){
        return tankowania;
    }
});