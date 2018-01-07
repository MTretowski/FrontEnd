app.controller('editFuellingController', function ($uibModalInstance, $uibModal, $rootScope, $scope, editingImported, editedFuelling, dictionary, keyWords, vehiclesService, inputValidator, dateValidator, vehicles, fuellingsService) {

    $scope.title = 'Edytuj tankowanie';
    $scope.acceptButtonTitle = 'Zapisz zmiany';
    $scope.editingImported = editingImported;
    $scope.dictionary = null;
    $scope.keyWords = null;
    $scope.description = null;
    $scope.additionalDescription = null;

    $scope.vehicle = null;
    $scope.date = editedFuelling.date;

    $scope.amount = editedFuelling.amount;
    $scope.grossValue = editedFuelling.grossValue;
    $scope.currency = editedFuelling.currency;

    {
        for (let i = 0; i < vehicles.length; i++) {
            if (vehicles[i].id === editedFuelling.vehicleId) {
                $scope.vehicle = vehicles[i];
                break;
            }
        }

        if (editingImported) {
            $scope.dictionary = dictionary.toString();
            $scope.keyWords = keyWords.toString();
            $scope.description = editedFuelling.description;
            $scope.additionalDescription = editedFuelling.additionalDescription;
        }
        else {
            $scope.supplierId = editedFuelling.supplierId.toString();
        }

    }

    $scope.selectVehicle = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/SelectVehicleModal.html',
            controller: 'selectVehicleController',
            backdrop: 'static',
        });
    };

    $rootScope.$on('selectedVehicle', function (event, vehicle) {
        $scope.vehicle = vehicle;
    });

    $scope.deleteVehicle = function () {
        $scope.vehicle = null;
    };

    $scope.accept = function () {
        let error = checkDataCorrectness();

        if (error === '') {
            if (editingImported) {
                $rootScope.$broadcast('editedFuelling', editedFuelling, $scope.amount, $scope.grossValue, $scope.currency, $scope.date,
                    $scope.vehicle.plateNumbers, $scope.vehicle.id, $scope.description, $scope.additionalDescription);
            }
            else {
                fuellingsService.editFuelling(editedFuelling.id, $scope.amount, $scope.grossValue, $scope.currency, $scope.date, $scope.supplierId, $scope.vehicle.id);
                $uibModalInstance.dismiss('cancel');
            }
            $scope.close();
        }
        else {
            alert(error);
        }
    };

    let checkDataCorrectness = function () {
        let error = '';

        error += inputValidator.checkDateInput($scope.date, 'Data tankowania');
        if (error === '') {
            error += dateValidator.isDateFromTheFuture($scope.date, 'Data tankowania');
        }
        error += inputValidator.checkTextInput($scope.vehicle, 'Pojazd');
        error += inputValidator.checkNumericInput($scope.amount, true, 'Ilość');
        error += inputValidator.checkNumericInput($scope.grossValue, true, 'Kwota');
        if ($scope.currency === '') {
            error += "Nie wybrano waluty.\n";
        }
        if ($scope.supplier === '') {
            error += "Nie wybrano dostawcy.\n";
        }

        return error;
    };

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

});