app.controller('importFuellingsController', function ($uibModalInstance, $uibModal, $rootScope, $scope, vehiclesService) {

    $scope.supplier = '';
    $scope.importedFuellings = [];
    $scope.fuellingsWithWarnings = [];
    $scope.otherActions = [];
    $scope.incorrectLines = [];

    $scope.vehicles = null;

    vehiclesService.getVehicles();

    let keyWordsE100 = ['ON'];
    let dictionaryE100 = ['ON', 'ON letni', 'ON euro', 'ON zimowy', 'ON turbo'];
    let linesE100 =
        {
            'headline': 0,
            'firstData': 1,
            'summaryLinesNumber': 1,
            'endEmptyLinesNumber': 1
        };
    let columnsE100 =
        {
            'amount': 11,
            'grossValue': 12,
            'currency': 10,
            'date': 0,
            'vehicle': 3,
            'description': 13
        };

    let keyWordsDKV = ['ON', 'TRUCK DIESEL'];
    let dictionaryDKV = ['Diesel SB (samoobsługa)'];
    let linesDKV =
        {
            'headline': 11,
            'firstData': 12,
            'summaryLinesNumber': 3,
            'endEmptyLinesNumber': 1
        };

    let columnsDKV =
        {
            'amount': 5,
            'grossValue': 8,
            'date': 3,
            'vehicle': 0,
            'description': 11,
            'additionalDescription': 10
        };
    let currencies = ['PLN', 'EUR', 'GBP', 'HUF', 'CHF', 'RUB'];

    $rootScope.$on('updateVehicles', function (event, vehicles) {
        $scope.vehicles = vehicles;
    });

    $scope.readFile = function () {
        if ($scope.supplier === '') {
            alert('Proszę wybrać dostawcę paliwa.')
        }
        else {
            let file = document.getElementById('wyborPliku').files[0];
            if (file === undefined) {
                alert('Proszę wybrać plik');
            }
            let splittedFileName = file.name.split('.');
            let fileExtention = splittedFileName[splittedFileName.length - 1];

            if (fileExtention !== 'csv') {
                alert('Wybrano plik o niewłaściwym rozszerzeniu. Proszę wybrać plik o rozszerzenie .csv');
            }
            else {
                let fileReader = new FileReader();
                fileReader.readAsText(file);
                fileReader.onloadend = function (e) {
                    let fileContent = e.target.result;
                    let splittedContent = fileContent.split('\n');

                    if ($scope.supplier === 'E100') {
                        importReadedData(splittedContent, $scope.supplier, keyWordsE100, dictionaryE100, linesE100, columnsE100);
                    }
                    else if ($scope.supplier === 'DKV') {
                        importReadedData(splittedContent, $scope.supplier, keyWordsDKV, dictionaryDKV, linesDKV, columnsDKV);
                    }
                };
                $scope.close();
            }
        }
    };

    let checkCurrencyCorrectness = function (currency) {
        for (let j = 0; j < currencies.length; j++) {
            if (currencies[j] === currency) {
                return '';
            }
        }
        return 'Błędny kod waluty' + ' (' + currency + '). ';
    };

    let checkDaysNumberInMonth = function (day, month, rawString) {
        let maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let monthsNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

        if (day < 1) {
            return 'Wprowadzono niepoprawną datę ' + rawString + ' (Numer dnia miesiąca musi być liczbą większą od 0)';
        }
        else if (month > 12 || month < 0) {
            return 'Wprowadzono niepoprawną datę ' + rawString + ' (Numer miesiąca musi być liczbą z zakresu 1-12)';
        }
        else {
            if (day > maxDaysInMonth[month - 1]) {
                if (month === 2) {
                    if (day === 29) {
                        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                            return '';
                        }
                        else {
                            return 'Wprowadzono niepoprawną datę ' + rawString + ' (Luty w roku nieprzestępnym ma 28 dni)';
                        }
                    }
                    else {
                        return 'Wprowadzono niepoprawną datę ' + rawString + ' (Luty w roku nieprzestępnym ma 28 dni, a w przestępnym 29 dni)';
                    }
                }
                else {
                    return 'Wprowadzono niepoprawną datę ' + rawString + ' (' + monthsNames[month - 1] + ' ma ' + maxDaysInMonth[month - 1] + ' dni)';
                }
            }
            else {
                return '';
            }
        }
    };


    let convertStringToDate = function (rawString, supplier) {

        let splittedDate = rawString.split(' ');
        let splittedDay = splittedDate[0].split('.');
        let splittedHour = splittedDate[1].split(':');

        if (splittedHour[2] === undefined) {
            splittedHour[2] = 0;
        }
        if (supplier === 'DKV') {
            splittedDay[2] = (20 + splittedDay[2]);
        }

        let date = new Date();
        date.setUTCFullYear(splittedDay[2], splittedDay[1] - 1, splittedDay[0]);
        date.setUTCHours(splittedHour[0], splittedHour[1], splittedHour[2], 0);

        return date;
    };

    let checkDateCorrectness = function (rawString) {

        let splittedDate = rawString.split(' ');
        let splittedDay;
        let splittedHour;
        let error = '';

        if (splittedDate[0] === undefined || splittedDate[1] === undefined) {
            error += 'Niepoprawny format daty (' + rawString + '). ';
        }

        else {
            splittedDay = splittedDate[0].split('.');
            splittedHour = splittedDate[1].split(':');

            if (splittedDay[0] === undefined || checkIsNumber(splittedDay[0]) || splittedDay[0] === '' ||
                splittedDay[1] === undefined || checkIsNumber(splittedDay[1]) || splittedDay[1] === '' ||
                splittedDay[2] === undefined || checkIsNumber(splittedDay[2]) || splittedDay[2] === '' ||
                splittedHour[0] === undefined || checkIsNumber(splittedHour[0]) || splittedHour[0] === '' ||
                splittedHour[1] === undefined || checkIsNumber(splittedHour[1]) || splittedHour[1] === '') {
                return 'Niepoprawny format daty (' + rawString + '). ';
            }
            else {
                if (splittedHour[0] > 23 || splittedHour[0] < 0) {
                    error += 'Liczba godzin w dacie (' + rawString + ') pochodzi spoza zakresu 0-23. '
                }
                if (splittedHour[1] > 59 || splittedHour[0] < 0) {
                    error += 'Liczba minut w dacie (' + rawString + ') pochodzi spoza zakresu 0-59. '
                }
                if (splittedHour[2] > 59 || splittedHour[0] < 0) {
                    error += 'Liczba sekund w dacie (' + rawString + ') pochodzi spoza zakresu 0-59. '
                }

                error += checkDaysNumberInMonth(splittedDay[0], splittedDay[1], rawString);

                let date = new Date();
                date.setUTCFullYear(splittedDay[2], splittedDay[1] - 1, splittedDay[0]);
                date.setUTCHours(splittedHour[0], splittedHour[1], splittedHour[2], 0);

                let now = new Date();
                let nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(),
                    now.getUTCSeconds());

                if (date > nowUTC) {
                    error += 'Data (' + rawString + ') pochodzi z przyszłości';
                }

            }
        }

        return error;
    };

    let checkIsFuelling = function (description, dictionary) {
        for (let j = 0; j < dictionary.length; j++) {
            if (description === dictionary[j]) {
                return true;
            }
        }
        return false;
    };

    let findKeyWords = function (description, keyWords, supplier) {
        if (supplier === 'E100') {
            if (description.includes(keyWords[0])) {
                return 'Opis zdarzenia nie jest zgodny z listą zdefiniowanych słów, ale zawiera słowo kluczowe ' + keyWords[0];
            }
            else {
                return '';
            }
        }
        else {
            if (description.includes(keyWords[0])) {
                return 'Opis zdarzenia nie jest zgodny z listą zdefiniowanych słów, ale zawiera słowo kluczowe ' + keyWords[0];
            }
            else if (description.includes(keyWords[1])) {
                return 'Opis zdarzenia nie jest zgodny z listą zdefiniowanych słów, ale zawiera słowo kluczowe ' + keyWords[1];
            }
            else {
                return '';
            }
        }
    };

    let checkLineCorrectness = function (line, columns, supplier) {

        let error = '';

        if (line[columns.amount] === undefined || line[columns.amount] === '') {
            error += 'Nie odnaleziono kolumny Ilość. '
        }
        else {
            error += checkNumberCorrectness(line[columns.amount], 'Ilość');
        }

        if (line[columns.grossValue] === undefined || line[columns.grossValue] === '') {
            error += 'Nie odnaleziono kolumny Kwota. '
        }
        else {
            error += checkNumberCorrectness(line[columns.grossValue], 'Kwota');
        }

        if (line[columns.date] === undefined || line[columns.date] === '') {
            error += 'Nie odnaleziono kolumny Data. '
        }
        else {
            error += checkDateCorrectness(line[columns.date]);
        }

        if (line[columns.vehicle] === undefined || line[columns.vehicle] === '') {
            error += 'Nie odnaleziono kolumny Pojazd. '
        }

        if (line[columns.description] === undefined || line[columns.description] === '') {
            error += 'Nie odnaleziono kolumny Opis. '
        }

        if ((supplier === 'DKV' && line[columns.additionalDescription] === undefined)) {
            error += 'Nie odnaleziono kolumny Opis dodatkowy. '
        }

        if (supplier === 'E100') {
            if (line[columns.currency === undefined] || line[columns.currency] === '') {
                error += 'Nie odnaleziono kolumny Waluta. '
            }
            else {
                error += (checkCurrencyCorrectness(line[columns.currency]));
            }
        }

        return error;
    };

    let checkIsNumber = function (number) {
        return new RegExp('[^(0-9)]').test(number);
    };

    let checkNumberCorrectness = function (number, checkingNumber) {
        let checkingResult = '';
        let splittedNumber = number.split(',');

        if (splittedNumber.length > 2) {
            checkingResult += 'Niepoprawny format liczby (' + number + '). '
        }
        else if (splittedNumber.length < 1) {
            checkingResult += 'Nie odnaleziono liczby. '
        }
        else {
            if (checkIsNumber(splittedNumber[0])) {
                checkingResult += 'Część całkowita liczby (' + number + ') zawiera znaki niebędące cyframi. '
            }

            if (splittedNumber[1] !== undefined) {
                if (checkIsNumber(splittedNumber[1])) {
                    checkingResult += 'Część dziesiętna liczby (' + number + ') zawiera znaki niebędące cyframi. '
                }
            }
        }

        if (checkingResult === '') {
            return '';
        }
        else {
            return checkingNumber + ': ' + checkingResult
        }
    };

    let importReadedData = function (splittedContent, supplier, keyWords, dictionary, lines, columns) {

        let splittedLine = null;
        let isFuelling = false;
        let message = '';
        let isVehicleInDatabase = false;
        let date = null;
        let vehicleId = null;
        let currency = null;
        let additionalDescription = null;
        let error = '';
        let incorrectLine = '';

        for (let i = lines.firstData; i < splittedContent.length - lines.summaryLinesNumber - lines.endEmptyLinesNumber; i++) {

            isVehicleInDatabase = false;
            isFuelling = false;
            message = '';
            date = null;
            vehicleId = null;
            currency = null;
            additionalDescription = null;
            incorrectLine = '';

            splittedLine = splittedContent[i].split(';');

            for (let j = 0; j < splittedLine.length; j++) {
                splittedLine[j] = splittedLine[j].trim();
            }

            error = checkLineCorrectness(splittedLine, columns, supplier);

            if (error !== '') {
                incorrectLine = splittedLine[0];
                for (let j = 1; j < splittedLine.length; j++) {
                    incorrectLine += '; ' + splittedLine [j]
                }

                $scope.incorrectLines.splice($scope.incorrectLines.length, 0, {
                    'line': incorrectLine,
                    'error': error
                })
            }

            else {
                if (supplier === 'E100') {
                    currency = splittedLine[columns.currency];
                    additionalDescription = '';
                }
                else {
                    currency = 'EUR';
                    additionalDescription = splittedLine[columns.additionalDescription];
                }

                date = convertStringToDate(splittedLine[columns.date], supplier);

                isFuelling = checkIsFuelling(splittedLine[columns.description], dictionary);

                for (let j = 0; j < $scope.vehicles.length; j++) {
                    if (splittedLine[columns.vehicle] === $scope.vehicles[j].plateNumbers) {
                        isVehicleInDatabase = true;
                        vehicleId = $scope.vehicles[j].id;
                        break;
                    }
                }

                if (isFuelling === false) {
                    if (supplier === 'E100') {
                        message += findKeyWords(splittedLine[columns.description], keyWords, supplier);
                    }
                    else if (supplier === 'DKV') {
                        message += findKeyWords(splittedLine[columns.additionalDescription], keyWords, supplier)
                    }
                    if (message !== '') {
                        isFuelling = true;
                    }
                }

                if (isVehicleInDatabase === false) {
                    if (message !== '') {
                        message += '; ';
                    }
                    message += 'Nie odnaleziono pojazdu ' + splittedLine[columns.vehicle] + ' w bazie';
                }

                if (isFuelling) {

                    if (message === '') {
                        $scope.importedFuellings.splice($scope.importedFuellings.length, 0, buildJSON(
                            splittedLine[columns.amount].replace(',', '.'), splittedLine[columns.grossValue].replace(',', '.'), currency, date, splittedLine[columns.vehicle], vehicleId, splittedLine[columns.description], additionalDescription, message, supplier)
                        )
                    }
                    else {
                        $scope.fuellingsWithWarnings.splice($scope.fuellingsWithWarnings.length, 0, buildJSON(
                            splittedLine[columns.amount].replace(',', '.'), splittedLine[columns.grossValue].replace(',', '.'), currency, date, splittedLine[columns.vehicle], vehicleId, splittedLine[columns.description], additionalDescription, message, supplier)
                        )
                    }

                }
                else {

                    if (message !== '') {
                        message += '; ';
                    }
                    message += 'Opis nie jest zgodny z żadnym ze zdefiniowanych słów: ' + dictionary.toString();

                    if (supplier === 'E100') {
                        message += '; Nie odnaleziono w opisie żadnego ze słów kluczowych: ' + keyWords.toString();
                    }
                    else if (supplier === 'DKV') {
                        message += '; Nie odnaleziono w opisie dodatkowym żadnego ze słów kluczowych: ' + keyWords.toString();
                    }

                    $scope.otherActions.splice($scope.otherActions.length, 0, buildJSON(
                        splittedLine[columns.amount].replace(',', '.'), splittedLine[columns.grossValue].replace(',', '.'), currency, date, splittedLine[columns.vehicle], vehicleId, splittedLine[columns.description], additionalDescription, message, supplier)
                    )
                }
            }
        }


        $uibModal.open({
            templateUrl: 'Views/Modals/ImportSummaryModal.html',
            controller: 'importSummaryController',
            backdrop: 'static',
            size: 'lg',
            resolve: {
                importedFuellings: function () {
                    return $scope.importedFuellings;
                },
                fuellingsWithWarnings: function () {
                    return $scope.fuellingsWithWarnings;
                },
                otherActions: function () {
                    return $scope.otherActions;
                },
                incorrectLines: function () {
                    return $scope.incorrectLines;
                },
                areThereWarnings: function () {
                    return $scope.fuellingsWithWarnings.length !== 0;
                },
                areThereOtherActions: function () {
                    return $scope.otherActions.length !== 0;
                },
                areThereFuellings: function () {
                    return $scope.importedFuellings.length !== 0;
                },
                areThereErrors: function () {
                    return $scope.incorrectLines.length !== 0;
                },
                supplier: function () {
                    return $scope.supplier;
                },
                keyWords: function () {
                    return keyWords
                },
                dictionary: function () {
                    return dictionary;
                },
                vehicles: function () {
                    return $scope.vehicles;
                }
            }
        });
    };

    let buildJSON = function (amount, grossValue, currency, date, vehicle, vehicleId, description, additionalDescription, message, supplier) {
        return {
            'amount': amount,
            'grossValue': grossValue,
            'currency': currency,
            'date': date,
            'vehicle': vehicle,
            'vehicleId': vehicleId,
            'description': description,
            'additionalDescription': additionalDescription,
            'message': message,
            'supplier': supplier
        }
    };

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

});
