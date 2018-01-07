app.controller('fuellingsController', function ($rootScope, $scope, $uibModal, fuellingsService, vehiclesService) {

    $scope.sortingKey = '';
    $scope.descendingSort = false;
    $scope.showFilters = false;
    $scope.supplierFilter = '';

    $scope.fuellings = null;
    let vehicles = null;

    fuellingsService.getFuellings();
    vehiclesService.getVehicles();

    let now = new Date();
    let nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    let oneYearAgo = new Date(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    nowUTC.setUTCHours(23, 59, 59);
    oneYearAgo.setUTCHours(0, 0, 0);
    $scope.dateFromFilter = oneYearAgo;
    $scope.dateToFilter = nowUTC;

    $rootScope.$on('updateFuellings', function (event, fuellings) {
        $scope.fuellings = fuellings;
    });

    $rootScope.$on('updateVehicles', function (event, vehiclesFromDatabase) {
        vehicles = vehiclesFromDatabase;
    });

    $scope.addFuelling = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/FuellingModal.html',
            controller: 'addFuellingController',
            backdrop: 'static',
        });
    };

    $scope.importFuellings = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/ImportFuellingsModal.html',
            controller: 'importFuellingsController',
            backdrop: 'static',
            size: 'sm'
        });
    };

    $scope.editFuelling = function (idx) {
        $uibModal.open({
            templateUrl: 'Views/Modals/FuellingModal.html',
            controller: 'editFuellingController',
            backdrop: 'static',
            resolve: {
                editingImported: function () {
                    return false;
                },
                editedFuelling: function () {
                    return $scope.fuellings[idx];
                },
                dictionary: function () {
                    return null;
                },
                keyWords: function () {
                    return null;
                },
                vehicles: function () {
                    return vehicles;
                }
            }
        });
    };

    $scope.deleteFuelling = function (idx) {
        let confirmAlert = confirm('Czy na pewno usunąć to tankowanie?');
        if (confirmAlert === true) {
            fuellingsService.deleteFuelling($scope.fuellings[idx].id);
        }
    }
});