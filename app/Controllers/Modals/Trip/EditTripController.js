app.controller('editTripController', function ($uibModalInstance, $uibModal, $rootScope, $scope, editedTrip, drivers, vehicles, fuellings, measurments, fuellingsService, measurmentsService, driversService, vehiclesService, tripsService, inputValidator, dateValidator) {

    $scope.fuellings = fuellings;
    $scope.measurments = measurments;
    $scope.drivers = drivers;
    $scope.vehicles = vehicles;

    $scope.title = 'Edytuj trasę';
    $scope.acceptButtonTitle = 'Zapisz zmiany';
    $scope.driver = null;
    $scope.vehicle = null;
    $scope.startDate = editedTrip.startDate;
    $scope.endDate = editedTrip.endDate;
    $scope.distance = editedTrip.distance;
    $scope.usedFuelWebasto = editedTrip.usedFuelWebasto;
    $scope.usedFuelCan = editedTrip.usedFuelCan;
    $scope.comment = editedTrip.comment;
    $scope.fuellingsSum = 0;
    $scope.fuelBeforeStart = 0;
    $scope.fuelAfterEnd = 0;
    $scope.businessTripNumber = editedTrip.businessTripNumber;

    {
        for (let i = 0; i < $scope.drivers.length; i++) {
            if ($scope.drivers[i].id === editedTrip.driverId) {
                $scope.driver = $scope.drivers[i];
                break;
            }
        }
        for (let i = 0; i < $scope.vehicles.length; i++) {
            if ($scope.vehicles[i].id === editedTrip.vehicleId) {
                $scope.vehicle = $scope.vehicles[i];
                break;
            }
        }
    }
    $scope.startingMeasurment =
        {
            'id': editedTrip.startingMeasurmentId,
            'date': null,
            'amount': null,
        };

    $scope.endingMeasurment =
        {
            'id': editedTrip.endingMeasurmentId,
            'date': null,
            'amount': null,
        };

    {
        let startingMeasurment = false;
        let endingMeasurment = false;
        for (let i = 0; i < $scope.measurments.length; i++) {
            if ($scope.measurments[i].id === $scope.startingMeasurment.id) {
                $scope.startingMeasurment.date = $scope.measurments[i].date;
                $scope.startingMeasurment.amount = $scope.measurments[i].leftFuelTankAmount + $scope.measurments[i].rightFuelTankAmount;
                startingMeasurment = true;
            }
            else if ($scope.measurments[i].id === $scope.endingMeasurment.id) {
                $scope.endingMeasurment.date = $scope.measurments[i].date;
                $scope.endingMeasurment.amount = $scope.measurments[i].leftFuelTankAmount + $scope.measurments[i].rightFuelTankAmount;
                endingMeasurment = true;
            }
        }

        $scope.fuellingsSum = 0;
        for (let i = 0; i < $scope.fuellings.length; i++) {
            if ($scope.fuellings[i].date <= $scope.endDate && $scope.fuellings[i].date >= $scope.startDate && $scope.fuellings[i].vehicleId === $scope.vehicle.id) {
                $scope.fuellingsSum += $scope.fuellings[i].amount;
            }
        }

        if ($scope.startingMeasurment.amount === null) {
            $scope.fuelBeforeStart = 0;
        }
        else {
            $scope.fuelBeforeStart = $scope.startingMeasurment.amount
        }

        if ($scope.endingMeasurment.amount === null) {
            $scope.fuelAfterEnd = 0;
        }
        else {
            $scope.fuelAfterEnd = $scope.endingMeasurment.amount
        }
    }

    $scope.selectDriver = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/SelectDriverModal.html',
            controller: 'selectDriverController',
            backdrop: 'static'
        });
    };

    $rootScope.$on('selectedDriver', function (event, driver) {
        $scope.driver = driver;
    });

    $scope.deleteDriver = function () {
        $scope.driver = null;
    };

    $scope.selectVehicle = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/SelectVehicleModal.html',
            controller: 'selectVehicleController',
            backdrop: 'static'
        });
    };

    $rootScope.$on('selectedVehicle', function (event, vehicle) {

        if ($scope.vehicle.id !== vehicle.id) {
            $scope.startingMeasurment.id = null;
            $scope.startingMeasurment.date = null;
            $scope.startingMeasurment.amount = null;
            $scope.endingMeasurment.id = null;
            $scope.endingMeasurment.date = null;
            $scope.endingMeasurment.amount = null;
        }

        $scope.vehicle = vehicle;

        $scope.updateData();

    });


    $scope.deleteVehicle = function () {
        $scope.vehicle = null;

        $scope.startingMeasurment.id = null;
        $scope.startingMeasurment.date = null;
        $scope.startingMeasurment.amount = null;
        $scope.endingMeasurment.id = null;
        $scope.endingMeasurment.date = null;
        $scope.endingMeasurment.amount = null;

        $scope.updateData();
    };


    $scope.updateData = function () {
        $scope.fuellingsSum = 0;
        for (let i = 0; i < $scope.fuellings.length; i++) {
            if ($scope.fuellings[i].date <= $scope.endDate && $scope.fuellings[i].date >= $scope.startDate && $scope.fuellings[i].vehicleId === $scope.vehicle.id) {
                $scope.fuellingsSum += $scope.fuellings[i].amount;
            }
        }

        if ($scope.startingMeasurment.amount === null) {
            $scope.fuelBeforeStart = 0;
        }
        else {
            $scope.fuelBeforeStart = $scope.startingMeasurment.amount
        }

        if ($scope.endingMeasurment.amount === null) {
            $scope.fuelAfterEnd = 0;
        }
        else {
            $scope.fuelAfterEnd = $scope.endingMeasurment.amount
        }
    };

    $scope.selectMeasurment = function (numer) {
        if ($scope.vehicle === null) {
            alert("Uwaga!\nProszę najpierw wybrać pojazd.");
        }
        else {
            $uibModal.open({
                templateUrl: 'Views/Modals/SelectMeasurmentModal.html',
                controller: 'selectMeasurmentController',
                backdrop: 'static',
                resolve: {
                    measurmentType: function () {
                        return numer;
                    },
                    vehicleId: function () {
                        return $scope.vehicle.id;
                    }

                }
            });
        }
    };

    $scope.$on('selectedMeasurment', function (event, measurmentType, id, date, amount) {
        if (measurmentType === 1) {
            if (id === $scope.endingMeasurment.id) {
                alert('Błąd!\nJeden pomiar nie może być jednocześnie pomiarem począkowym i końcowym.')
            }
            else {
                $scope.startingMeasurment.id = id;
                $scope.startingMeasurment.date = date;
                $scope.startingMeasurment.amount = amount;
            }
        }
        else {
            if (id === $scope.startingMeasurment.id) {
                alert('Błąd!\nJeden pomiar nie może być jednocześnie pomiarem począkowym i końcowym.')
            }
            else {
                $scope.endingMeasurment.id = id;
                $scope.endingMeasurment.date = date;
                $scope.endingMeasurment.amount = amount;
            }
        }
        $scope.updateData();
    });

    $scope.deleteMeasurment = function (measurmentType) {
        if (measurmentType === 1) {
            $scope.startingMeasurment.id = null;
            $scope.startingMeasurment.date = null;
            $scope.startingMeasurment.amount = null;
        }
        else {
            $scope.endingMeasurment.id = null;
            $scope.endingMeasurment.date = null;
            $scope.endingMeasurment.amount = null;
        }
        $scope.updateData();
    };


    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.tripAddFuelling = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/FuellingModal.html',
            controller: 'addFuellingController',
            backdrop: 'static'
        });
    };

    $scope.tripImportFuellings = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/ImportFuellingsModal.html',
            controller: 'importFuellingsController',
            backdrop: 'static',
            size: 'sm'
        });
    };

    $scope.tripAddMeasurment = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/MeasurmentModal.html',
            controller: 'addMeasurmentController',
            backdrop: 'static'
        });
    };

    $scope.accept = function () {
        let error = checkDataCorrectness();

        if (error === '') {

            editTrip();
        }
        else {
            alert(error);
        }

    };

    let checkDataCorrectness = function () {
        let error = '';

        error += inputValidator.checkTextInput($scope.driver, 'Kierowca');
        error += inputValidator.checkTextInput($scope.vehicle, 'Pojazd');
        error += inputValidator.checkNumericInput($scope.distance, true, 'Przejechany dystans');
        error += inputValidator.checkNumericInput($scope.usedFuelWebasto, false, 'Zużyte paliwo - Webasto');
        error += inputValidator.checkNumericInput($scope.usedFuelCan, true, 'Zużyte paliwo - CAN');

        let startDateError = inputValidator.checkDateInput($scope.startDate, 'Data rozpoczęcia trasy');
        let endDateError = inputValidator.checkDateInput($scope.endDate, 'Data zakończenia trasy');
        if (startDateError === '') {
            startDateError = dateValidator.isDateFromTheFuture($scope.startDate, 'Data rozpoczęcia trasy');
        }

        if (endDateError === '') {
            endDateError = dateValidator.isDateFromTheFuture($scope.endDate, 'Data zakończenia trasy');
        }

        if ($scope.startingMeasurment.id === null) {
            error += 'Nie wybrano pomiaru początkowego';
        }

        if ($scope.endingMeasurment.id === null) {
            error += 'Nie wybrano pomiaru końcowego';
        }

        if (startDateError === '' && endDateError === '') {
            if ($scope.startDate.getTime() > $scope.endDate.getTime()) {
                error += 'Data rozpoczęcia nie może być datą późniejszą niż data zakończenia\n';
            }
        }
        else {
            error += startDateError;
            error += endDateError;
        }

        return error;
    };

    let editTrip = function () {
        tripsService.editTrip(
            editedTrip.id,
            $scope.businessTripNumber,
            $scope.startDate,
            $scope.endDate,
            $scope.distance,
            $scope.usedFuelCan,
            $scope.usedFuelWebasto,
            (($scope.usedFuelCan + $scope.usedFuelWebasto) / $scope.distance * 100),
            (($scope.fuelBeforeStart + $scope.fuellingsSum - $scope.fuelAfterEnd) / $scope.distance * 100),
            $scope.comment,
            $scope.vehicle.id,
            $scope.driver.id,
            $scope.startingMeasurment.id,
            $scope.endingMeasurment.id
        )
    };

});