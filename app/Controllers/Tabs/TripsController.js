app.controller('tripsController', function ($rootScope, $scope, $uibModal, tripsService, driversService, vehiclesService, fuellingsService, measurmentsService) {
    $scope.sortingKey = null;
    $scope.descendingSort = false;
    $scope.showFilters = false;

    $scope.plateNumbersFilter = '';
    $scope.driverNameFilter = '';
    $scope.businessTripNumberFilter = '';

    $scope.trips = null;
    $scope.drivers = null;
    $scope.vehicles = null;

    tripsService.getTrips();
    driversService.getDrivers();
    vehiclesService.getVehicles();
    fuellingsService.getFuellings();
    measurmentsService.getMeasurments();

    let now = new Date();
    let nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    let oneYearAgo = new Date(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    nowUTC.setUTCHours(23, 59, 59);
    oneYearAgo.setUTCHours(0, 0, 0);
    $scope.startDateFromFilter = oneYearAgo;
    $scope.startDateToFilter = nowUTC;
    $scope.endDateFromFilter = oneYearAgo;
    $scope.endDateToFilter = nowUTC;

    $rootScope.$on('updateTrips', function (event, trips) {
        $scope.trips = trips;
    });

    $rootScope.$on('updateVehicles', function (event, vehicles) {
        $scope.vehicles = vehicles;
    });

    $rootScope.$on('updateDrivers', function (event, drivers) {
        $scope.drivers = drivers;
    });

    $rootScope.$on('updateFuellings', function (event, fuellings) {
        $scope.fuellings = fuellings;
    });

    $rootScope.$on('updateMeasurments', function (event, measurments) {
        $scope.measurments = measurments;
    });

    $scope.addTrip = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/TripModal.html',
            controller: 'addTripController',
            backdrop: 'static',
            size: 'lg'
        });
    };

    $scope.editTrip = function (idx) {
        $uibModal.open({
            templateUrl: 'Views/Modals/TripModal.html',
            controller: 'editTripController',
            backdrop: 'static',
            size: 'lg',
            resolve: {
                editedTrip: function () {
                    return $scope.trips[idx];
                },
                vehicles: function () {
                    return $scope.vehicles;
                },
                drivers: function () {
                    return $scope.drivers;
                },
                fuellings: function () {
                    return $scope.fuellings;
                },
                measurments: function () {
                    return $scope.measurments;
                }
            }
        });
    };

    $scope.deleteTrip = function (idx) {
        let confirmAlert = confirm('Czy na pewno usunąć tę trasę?');
        if (confirmAlert === true) {
            tripsService.deleteTrip($scope.trips[idx].id);
        }
    }
});