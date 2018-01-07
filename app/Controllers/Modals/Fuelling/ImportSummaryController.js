app.controller('importSummaryController', function ($uibModalInstance, $uibModal, $rootScope, $scope, importedFuellings, fuellingsWithWarnings, otherActions, incorrectLines, areThereWarnings, areThereOtherActions, areThereFuellings, areThereErrors, supplier, dictionary, keyWords, vehicles, fuellingsService) {

    $scope.importedFuellings = importedFuellings;
    $scope.fuellingsWithWarnings = fuellingsWithWarnings;
    $scope.otherActions = otherActions;
    $scope.incorrectLines = incorrectLines;
    $scope.areThereWarnings = areThereWarnings;
    $scope.areThereOtherActions = areThereOtherActions;
    $scope.areThereFuellings = areThereFuellings;
    $scope.areThereErrors = areThereErrors;
    $scope.supplier = supplier;

    $scope.showWarnings = false;
    $scope.showFuellings = false;
    $scope.showOtherActions = false;
    $scope.showErrors = false;

    $scope.sortingKeyOtherActions = '';
    $scope.descendingSortOtherActions = false;
    $scope.showFiltersOtherActions = false;

    $scope.sortingKeyWarnings = '';
    $scope.descendingSortWarnings = false;
    $scope.showFiltersWarning = false;

    $scope.sortingKey = '';
    $scope.descendingSort = false;
    $scope.showFilters = false;

    let now = new Date();
    let nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    let twoYearsAgo = new Date(now.getUTCFullYear() - 2, now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    nowUTC.setUTCHours(23, 59, 59);
    twoYearsAgo.setUTCHours(0, 0, 0);
    $scope.dateFromFilter = twoYearsAgo;
    $scope.dateToFilter = nowUTC;
    $scope.dateFromWarningsFilter = twoYearsAgo;
    $scope.dateToWarningsFilter = nowUTC;
    $scope.dateFromOtherActionsFilter = twoYearsAgo;
    $scope.dateToOtherActionsFilter = nowUTC;

    $rootScope.$on('editedFuelling', function (event, editedFuelling, amount, grossValue, currency, date,
                                               vehicle, vehicleId, description, additionalDescription) {
        if ($scope.importedFuellings.indexOf(editedFuelling) >= 0) {
            $scope.importedFuellings.splice($scope.importedFuellings.indexOf(editedFuelling), 1);
        }
        else if ($scope.fuellingsWithWarnings.indexOf(editedFuelling) >= 0) {
            $scope.fuellingsWithWarnings.splice($scope.fuellingsWithWarnings.indexOf(editedFuelling), 1);

        }
        else if ($scope.otherActions.indexOf(editedFuelling) >= 0) {
            $scope.otherActions.splice($scope.otherActions.indexOf(editedFuelling), 1);
        }

        let message = '';
        let isFuelling = checkIsFuelling(description);

        if (isFuelling === false) {
            if (supplier === 'E100') {
                message += findKeyWords(description);
            }
            else if (supplier === 'DKV') {
                message += findKeyWords(additionalDescription)
            }
            if (message !== '') {
                isFuelling = true;
            }
        }

        if (isFuelling) {
            if (message === '') {
                $scope.importedFuellings.splice($scope.importedFuellings.length, 0, buildJSON(
                    amount, grossValue, currency, date, vehicle, vehicleId, description, additionalDescription, message, supplier)
                )
            }
            else {
                $scope.fuellingsWithWarnings.splice($scope.fuellingsWithWarnings.length, 0, buildJSON(
                    amount, grossValue, currency, date, vehicle, vehicleId, description, additionalDescription, message, supplier)
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
                amount, grossValue, currency, date, vehicle, vehicleId, description, additionalDescription, message, supplier)
            )
        }

        checkArraysLength();

    });

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
            'supplier': supplier,
        }
    };

    let checkArraysLength = function () {
        $scope.areThereWarnings = $scope.fuellingsWithWarnings.length !== 0;
        $scope.areThereOtherActions = $scope.otherActions.length !== 0;
        $scope.areThereFuellings = $scope.importedFuellings.length !== 0;
    };

    $scope.editImportedFuelling = function (idx) {
        $uibModal.open({
            templateUrl: 'Views/Modals/FuellingModal.html',
            controller: 'editFuellingController',
            backdrop: 'static',
            resolve: {
                editingImported: function () {
                    return true;
                },
                editedFuelling: function () {
                    return $scope.importedFuellings[idx];
                },
                dictionary: function () {
                    return dictionary;
                },
                keyWords: function () {
                    return keyWords;
                },
                vehicles: function () {
                    return vehicles;
                }
            }
        });
    };

    $scope.deleteImportedFuelling = function (idx) {
        $scope.importedFuellings.splice(idx, 1);
        $scope.checkAreThereFuellings();
    };

    $scope.editFuellingWithWarning = function (idx) {
        $uibModal.open({
            templateUrl: 'Views/Modals/FuellingModal.html',
            controller: 'editFuellingController',
            backdrop: 'static',
            resolve: {
                editingImported: function () {
                    return true;
                },
                editedFuelling: function () {
                    return $scope.fuellingsWithWarnings[idx];
                },
                dictionary: function () {
                    return dictionary;
                },
                keyWords: function () {
                    return keyWords;
                },
                vehicles: function () {
                    return vehicles;
                }
            }
        });
    };

    $scope.deleteFuellingWithWarning = function (idx) {
        $scope.fuellingsWithWarnings.splice(idx, 1);
        $scope.checkAreThereWarnings();
    };

    $scope.editOtherAction = function (idx) {
        $uibModal.open({
            templateUrl: 'Views/Modals/FuellingModal.html',
            controller: 'editFuellingController',
            backdrop: 'static',
            resolve: {
                editingImported: function () {
                    return true;
                },
                editedFuelling: function () {
                    return $scope.otherActions[idx];
                },
                dictionary: function () {
                    return dictionary;
                },
                keyWords: function () {
                    return keyWords;
                },
                vehicles: function () {
                    return vehicles;
                }
            }
        });
    };

    $scope.deleteOtherAction = function (idx) {
        $scope.otherActions.splice(idx, 1);
        $scope.checkAreThereOtherActions();
    };

    $scope.checkAreThereWarnings = function () {
        if ($scope.fuellingsWithWarnings.length === 0) {
            $scope.areThereWarnings = false;
        }
    };

    $scope.checkAreThereFuellings = function () {
        if ($scope.importedFuellings.length === 0) {
            $scope.areThereFuellings = false;
        }
    };

    $scope.checkAreThereOtherActions = function () {
        if ($scope.otherActions.length === 0) {
            $scope.areThereOtherActions = false;
        }
    };

    let checkIsFuelling = function (description) {
        for (let j = 0; j < dictionary.length; j++) {
            if (description === dictionary[j]) {
                return true;
            }
        }
        return false;
    };

    let findKeyWords = function (description) {
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

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.accept = function () {
        $uibModalInstance.dismiss('cancel');

        $uibModal.open({
            templateUrl: 'Views/Modals/SaveImportedSummaryModal.html',
            controller: 'saveImportedSummaryController',
            backdrop: 'static',
            size: 'lg'
        });

        fuellingsService.importFuellings($scope.importedFuellings);

    }


});