app.controller('addTripController', function ($uibModal, $uibModalInstance, $rootScope, $scope, fuellingsService, inputValidator, dateValidator, tripsService) {

    $scope.title = 'Dodaj trasę';
    $scope.acceptButtonTitle = 'Dodaj';
    $scope.driver = null;
    $scope.vehicle = null;

    let now = new Date();
    $scope.startDate = new Date();
    $scope.startDate.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    $scope.startDate.setUTCHours(0, 0, 0, 0);

    $scope.endDate = new Date();
    $scope.endDate.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    $scope.endDate.setUTCHours(now.getHours(), now.getMinutes(), 0, 0);

    $scope.businessTripNumber = '';
    $scope.distance = 0;
    $scope.usedFuelWebasto = 0;
    $scope.usedFuelCan = 0;
    $scope.comment = '';
    $scope.fuelBeforeStart = 0;
    $scope.fuellingsSum = 0;
    $scope.fuelAfterEnd = 0;

    $scope.fuellings = null;

    fuellingsService.getFuellings();

    $rootScope.$on('updateFuellings', function (event, fuellings) {
        $scope.fuellings = fuellings
    });

    $scope.startingMeasurment =
        {
            'id': null,
            'date': null,
            'amount': null,
        };

    $scope.endingMeasurment =
        {
            'id': null,
            'date': null,
            'amount': null,
        };

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
            backdrop: 'static',
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
            alert('Uwaga!\nProszę najpierw wybrać pojazd.');
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

    $scope.$on('selectedMeasurment', function (event, measurmentType, id, measurmentDate, amount) {
        if (measurmentType === 1) {
            if (id === $scope.endingMeasurment.id) {
                alert('Błąd!\nJeden pomiar nie może być jednocześnie pomiarem począkowym i końcowym.')
            }
            else {
                $scope.startingMeasurment.id = id;
                $scope.startingMeasurment.date = measurmentDate;
                $scope.startingMeasurment.amount = amount;
            }
        }
        else {
            if (id === $scope.startingMeasurment.id) {
                alert('Błąd!\nJeden pomiar nie może być jednocześnie pomiarem począkowym i końcowym.')
            }
            else {
                $scope.endingMeasurment.id = id;
                $scope.endingMeasurment.date = measurmentDate;
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
            addTrip();
        }
        else {
            alert(error);
        }

    };

    let addTrip = function () {
        tripsService.addTrip(
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

        if ($scope.startingMeasurment.id === null) {
            error += 'Nie wybrano pomiaru początkowego';
        }

        if ($scope.endingMeasurment.id === null) {
            error += 'Nie wybrano pomiaru końcowego';
        }

        if (endDateError === '') {
            endDateError = dateValidator.isDateFromTheFuture($scope.endDate, 'Data zakończenia trasy');
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

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

});