app.service('firstNameValidator', function (inputValidator) {

    this.checkFirstName = function (firstName) {
        let error = inputValidator.checkTextInput(firstName, 'Imię');

        if (error === '') {
            if (new RegExp('[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]').test(firstName)) {
                error += 'Imię zawiera niedozwolone znaki\n';
            }
            if (firstName.length < 3) {
                error += "Podane imię jest zbyt krótkie\n";
            }

            if (error !== '') {
                error += "\nPodpowiedź\nImię powinno zawierać jedynie litery i nie być krótsze niż 3 litery\n\n"
            }
        }

        return error;
    }
});