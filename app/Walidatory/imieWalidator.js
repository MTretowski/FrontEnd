app.service('imieWalidator', function (inputWalidator) {

    this.sprawdzImie = function (imie) {
        let blad = inputWalidator.sprawdzPoleTekstowe(imie, 'Imię');

        if(blad === '') {
            if (new RegExp('[^a-zA-Z]').test(imie)) {
                blad += 'Imię zawiera niedozwolone znaki\n';
            }
            if (imie.length < 3) {
                blad += "Podane imię jest zbyt krótkie\n";
            }

            if (blad !== '') {
                blad += "\nPodpowiedź\nImię powinno zawierać jedynie litery i nie być krótsze niż 3 litery\n\n"
            }
        }

        return blad;
    }
});