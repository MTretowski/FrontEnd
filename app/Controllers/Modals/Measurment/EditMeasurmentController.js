app.controller('editMeasurmentController', function ($uibModalInstance, $uibModal, $rootScope, $scope, editedMeasurment, vehiclesService, inputValidator, vehicles, measurmentsService) {
    $scope.title = 'Edytuj pomiar';
    $scope.acceptButtonTitle = 'Zapisz zmiany';

    $scope.date = editedMeasurment.date;
    $scope.measurmentWay = editedMeasurment.measurmentWay;
    $scope.leftFuelTank = editedMeasurment.leftFuelTank;
    $scope.rightFuelTank = editedMeasurment.rightFuelTank;

    $scope.vehicle = null;

    {
        for (let i = 0; i < vehicles.length; i++) {
            if (editedMeasurment.vehicleId === vehicles[i].id) {
                $scope.vehicle = vehicles[i];
            }
        }
    }

    $scope.selectedMeasurmentWay = function () {
        if ($scope.measurmentWay === 'manualMeasurment') {
            if ($scope.vehicle.leftTankConverter === null || $scope.vehicle.rightTankConverter === null) {
                alert("Nie można wybrać tego sposobu pomiaru.\nNie zdefiniowano przeliczników dla zbiorników w tym pojeździe.");
                $scope.measurmentWay = '';
            }
        }
        else if ($scope.measurmentWay === 'returnToFull') {
            if ($scope.vehicle.leftTankCapacity === null || $scope.vehicle.rightTankCapacity === null) {
                alert("Nie można wybrać tego sposobu pomiaru.\nNie zdefiniowano maksymalnych pojemności dla zbiorników w tym pojeździe");
                $scope.measurmentWay = '';
            }
        }
    };

    $scope.selectVehicle = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/SelectVehicleModal.html',
            controller: 'selectVehicleController',
            backdrop: 'static'
        });
    };

    $rootScope.$on('selectedVehicle', function (event, vehicle) {
        $scope.vehicle = vehicle;
        $scope.measurmentWay = '';
    });

    $scope.deleteVehicle = function () {
        $scope.vehicle = null;
        $scope.measurmentWay = 'noVehicle'
    };

    $scope.accept = function () {
        let error = checkDataCorrectness();

        if (error === '') {
            measurmentsService.editMeasurment(editedMeasurment.id, $scope.date, $scope.leftFuelTank, $scope.rightFuelTank, $scope.measurmentWay, $scope.vehicle.id);
            $uibModalInstance.dismiss('cancel');
        }
        else {
            alert(error);
        }
    };

    let checkDataCorrectness = function () {
        let error = '';

        error += inputValidator.checkTextInput($scope.vehicle, 'Pojazd');
        error += inputValidator.checkDateInput($scope.date, 'Data pomiaru');

        if ($scope.measurmentWay === '' || $scope.measurmentWay === 'noVehicle') {
            error += "Nie wybrano sposobu pomiaru.\n";
        }
        else {

            error += inputValidator.checkNumericInput($scope.leftFuelTank, false, 'Zbiornik prawy');
            error += inputValidator.checkNumericInput($scope.rightFuelTank, false, 'Zbiornik lewy');

            if (inputValidator.checkNumericInput($scope.rightFuelTank, false) && inputValidator.checkNumericInput($scope.leftFuelTank, false)) {

                if ($scope.measurmentWay === 'returnToFull') {
                    if ($scope.leftFuelTank > $scope.vehicle.leftTankCapacity) {
                        error += 'Ilość dotanowanego paliwa do zbiornika lewego jest większa niż zdefiniowana pojemność zbiornika.\n';
                    }
                    if ($scope.rightFuelTank > $scope.vehicle.rightTankCapacity) {
                        error += 'Ilość dotanowanego paliwa do zbiornika prawego jest większa niż zdefiniowana pojemność zbiornika.\n';
                    }
                }
                else if ($scope.measurmentWay === 'measuredAmount') {
                    if ($scope.leftFuelTank > $scope.vehicle.leftTankCapacity) {
                        error += 'Ilość zmierzonego paliwa w zbiorniku lewym jest większa niż zdefiniowana pojemność zbiornika.\n';
                    }
                    if ($scope.rightFuelTank > $scope.vehicle.rightTankCapacity) {
                        error += 'Ilość zmierzonego paliwa w zbiorniku prawym jest większa niż zdefiniowana pojemność zbiornika.\n';
                    }
                }
                else if ($scope.measurmentWay === 'manualMeasurment') {
                    if ($scope.vehicle.leftTankCapacity !== null) {
                        if (($scope.vehicle.leftTankConverter * $scope.leftFuelTank) > $scope.vehicle.leftTankCapacity) {
                            error += 'Ilość zmierzonego paliwa w zbiorniku lewym jest większa niż zdefiniowana pojemność zbiornika.\n';
                        }
                    }
                    if ($scope.vehicle.rightTankCapacity !== null) {
                        if (($scope.vehicle.rightTankConverter * $scope.rightFuelTank) > $scope.vehicle.rightTankCapacity) {
                            error += 'Ilość zmierzonego paliwa w zbiorniku prawym jest większa niż zdefiniowana pojemność zbiornika.\n';
                        }
                    }
                }
            }
        }

        return error;
    };

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

});