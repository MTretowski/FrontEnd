app.service('nazwiskoWalidator', function (inputWalidator, inputSerwis) {

    this.sprawdzNazwisko = function (nazwisko) {
        let blad = inputWalidator.sprawdzPoleTekstowe(nazwisko, "Nazwisko");

        if (blad === '') {

            nazwisko = inputSerwis.usunSpacje(nazwisko);

            if (new RegExp('[^a-zA-Z\-]').test(nazwisko)) {
                blad += 'Nazwisko zawiera niedozwolone znaki\n';
            }
            let nazwiskoPodzielone = nazwisko.split('-');
            if (nazwiskoPodzielone.length > 2) {
                blad += 'Nazwisko wpisane jest w niepoprawnym formacie\n';
            }

            else if (nazwiskoPodzielone.length === 2) {
                if (nazwiskoPodzielone[0].length < 3) {
                    blad += 'Pierwszy człon nazwiska jest zbyt krótki\n';
                }

                if (nazwiskoPodzielone[1].length < 3) {
                    blad += 'Drugi człon nazwiska jest zbyt krótki\n';
                }
            }
            else if (nazwisko.length < 3) {
                blad += "Podane nazwisko jest zbyt krótkie\n";
            }

            if (blad !== '') {
                blad += "\nPodpowiedź\nNazwisko powinno zawierać jedynie litery. Nazwisko dwuczłonowe powinno być wprowadzane w formacie: człon1-człon2, np. Nowak-Kowalski\n\n"
            }
        }

        return blad;
    }
});