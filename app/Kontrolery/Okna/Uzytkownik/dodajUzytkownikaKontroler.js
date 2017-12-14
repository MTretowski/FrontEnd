app.controller('dodajUzytkownikaKontroler', function ($uibModalInstance, $scope, inputSerwis, imieWalidator, nazwiskoWalidator, inputWalidator) {
    $scope.tytul = 'Dodaj użytkownika';
    $scope.tekstPrzyciskuAkceptuj = 'Dodaj';
    $scope.trybEdycji = false;

    $scope.imie = null;
    $scope.nazwisko = null;
    $scope.login = null;
    $scope.haslo = null;
    $scope.rola = '';
    $scope.statusAktywnosci = '';

    $scope.akceptuj = function () {
        let blad = sprawdzPoprawnoscDanych();

        if(blad === ''){
            alert('Wszystko w porządku, dodaję kierowcę')
        }
        else{
            alert(blad);
        }
        
    };

    let sprawdzPoprawnoscDanych = function () {
        let blad = '';

        blad += nazwiskoWalidator.sprawdzNazwisko($scope.nazwisko);
        if(blad === ''){
            $scope.nazwisko = inputSerwis.usunSpacje($scope.nazwisko);
        }

        blad += imieWalidator.sprawdzImie($scope.imie);
        blad += inputWalidator.sprawdzPoleTekstowe($scope.login, 'Login');
        blad += inputWalidator.sprawdzPoleTekstowe($scope.haslo, 'Hasło');
        
        if($scope.rola === ''){
            blad += 'Nie wybrano roli użykownika.\n';
        }
        
        if($scope.statusAktywnosci === ''){
            blad += 'Nie wybrano statusu aktywności.\n'
        }
        
        return blad;
    };

    $scope.zamknij = function () {
        $uibModalInstance.dismiss('cancel');
    };

});