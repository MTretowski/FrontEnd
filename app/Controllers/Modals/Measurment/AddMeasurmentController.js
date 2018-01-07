app.controller('addMeasurmentController', function ($uibModalInstance, $uibModal, $rootScope, $scope, measurmentsService, inputValidator) {
    $scope.title = 'Dodaj pomiar';
    $scope.acceptButtonTitle = 'Dodaj';
    let now = new Date();
    let nowUTC = new Date();
    nowUTC.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    nowUTC.setUTCHours(now.getHours(), now.getMinutes(), 0, 0);
    $scope.date = nowUTC;
    $scope.vehicle = null;

    $scope.measurmentWay = 'noVehicle';

    $scope.leftFuelTank = 0;
    $scope.rightFuelTank = 0;

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

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.accept = function () {
        let error = checkDataCorrectness();

        if (error === '') {
            measurmentsService.addMeasurment($scope.date, $scope.leftFuelTank, $scope.rightFuelTank, $scope.measurmentWay, $scope.vehicle.id);
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

});