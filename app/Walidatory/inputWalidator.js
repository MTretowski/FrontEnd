app.service('inputWalidator', function(){

    this.sprawdzPoleTekstowe = function (pole, nazwaPola){
        if (pole === undefined || pole === '' || pole === null) {
            return (nazwaPola + ': Pole jest puste.\n');
        }
        else{
            return '';
        }
    };

    this.sprawdzPoleNumeryczne = function (pole, rozneOdZera, nazwaPola){
        if(rozneOdZera){
            if (pole === undefined || pole === null) {
                return (nazwaPola + ': Pole jest puste lub zawiera niedozwolone znaki.\n');
            }
            else if(pole === 0) {
                return (nazwaPola + ': Wartość pola musi być większa od 0.\n');
            }
            else{
                return '';
            }
        }
        else{
            if (pole === undefined || pole === null) {
                return (nazwaPola + ': Pole jest puste lub zawiera niedozwolone znaki.\n');
            }
            else{
                return '';
            }
        }
    };

    this.sprawdzPoleDaty = function (pole, nazwaPola){
        if (pole === undefined || pole === null) {
            return (nazwaPola + ': Pole jest puste lub zawiera niedozwolone znaki.\n');
        }
        else{
            return '';
        }
    }

});