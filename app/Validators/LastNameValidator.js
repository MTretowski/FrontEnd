app.service('lastNameValidator', function (inputValidator, inputService) {

    this.checkLastName = function (lastName) {
        let error = inputValidator.checkTextInput(lastName, "Nazwisko");

        if (error === '') {

            lastName = inputService.deleteSpaces(lastName);

            if (new RegExp('[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\-]').test(lastName)) {
                error += 'Nazwisko zawiera niedozwolone znaki\n';
            }
            let splittedLastName = lastName.split('-');
            if (splittedLastName.length > 2) {
                error += 'Nazwisko wpisane jest w niepoprawnym formacie\n';
            }

            else if (splittedLastName.length === 2) {
                if (splittedLastName[0].length < 3) {
                    error += 'Pierwszy człon nazwiska jest zbyt krótki\n';
                }

                if (splittedLastName[1].length < 3) {
                    error += 'Drugi człon nazwiska jest zbyt krótki\n';
                }
            }
            else if (lastName.length < 3) {
                error += "Podane nazwisko jest zbyt krótkie\n";
            }

            if (error !== '') {
                error += "\nPodpowiedź\nNazwisko powinno zawierać jedynie litery. Nazwisko dwuczłonowe powinno być wprowadzane w formacie: człon1-człon2, np. Nowak-Kowalski\n\n"
            }
        }

        return error;
    }
});