app.controller('measurmentsController', function ($rootScope, $scope, $uibModal, measurmentsService, vehiclesService) {

    $scope.sortingKey = '';
    $scope.descendingSort = false;
    $scope.showFilters = false;

    $scope.measurments = null;
    let vehicles = null;

    vehiclesService.getVehicles();
    measurmentsService.getMeasurments();

    let now = new Date();
    let nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    let oneYearAgo = new Date(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(),
        now.getUTCSeconds());
    nowUTC.setUTCHours(23, 59, 59);
    oneYearAgo.setUTCHours(0, 0, 0);
    $scope.dateFromFilter = oneYearAgo;
    $scope.dateToFilter = nowUTC;

    $rootScope.$on('updateMeasurments', function (event, measurments) {
        $scope.measurments = measurments;
    });

    $rootScope.$on('updateVehicles', function (event, vehiclesFromDatabase) {
        vehicles = vehiclesFromDatabase;
    });

    $scope.addMeasurment = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/MeasurmentModal.html',
            controller: 'addMeasurmentController',
            backdrop: 'static'
        });
    };

    $scope.editMeasurment = function (idx) {
        $uibModal.open({
            templateUrl: 'Views/Modals/MeasurmentModal.html',
            controller: 'editMeasurmentController',
            backdrop: 'static',
            resolve: {
                editedMeasurment: function () {
                    return $scope.measurments[idx];
                },
                vehicles: function () {
                    return vehicles;
                }
            }
        });
    };

    $scope.deleteMeasurment = function (idx) {
        let error = '';
        if ($scope.measurments[idx].startedBusinessTrip !== '') {
            error += ('Ten pomiar jest przypisany do trasy ' + $scope.measurments[idx].startedBusinessTrip + ' jako pomiar początkowy. Proszę najpierw usunąć powiązanie edytując tasę.')
        }
        if ($scope.measurments[idx].endedBusinessTrip !== '') {
            error += ('Ten pomiar jest przypisany do trasy ' + $scope.measurments[idx].endedBusinessTrip + ' jako pomiar końcowy. Proszę najpierw usunąć powiązanie edytując tasę.')
        }
        if (error !== '') {
            alert(error);
        }
        else {
            let confirmAlert = confirm('Czy na pewno usunąć ten pomiar?');
            if (confirmAlert === true) {
                measurmentsService.deleteMeasurment($scope.measurments[idx].id);
            }
        }
    }

});