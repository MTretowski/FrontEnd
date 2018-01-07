app.service('inputValidator', function () {

    this.checkTextInput = function (field, fieldName) {
        if (field === undefined || field === '' || field === null) {
            return (fieldName + ': Pole jest puste.\n');
        }
        else {
            return '';
        }
    };

    this.checkNumericInput = function (field, notEqualsZero, fieldName) {
        if (notEqualsZero) {
            if (field === undefined || field === null) {
                return (fieldName + ': Pole jest puste lub zawiera niedozwolone znaki.\n');
            }
            else if (field === 0) {
                return (fieldName + ': Wartość pola musi być większa od 0.\n');
            }
            else {
                return '';
            }
        }
        else {
            if (field === undefined || field === null) {
                return (fieldName + ': Pole jest puste lub zawiera niedozwolone znaki.\n');
            }
            else {
                return '';
            }
        }
    };

    this.checkDateInput = function (field, fieldName) {
        if (field === undefined || field === null) {
            return (fieldName + ': Pole jest puste lub zawiera niedozwolone znaki.\n');
        }
        else {
            return '';
        }
    }

});