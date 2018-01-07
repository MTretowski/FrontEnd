app.controller('vehiclesController', function ($rootScope, $scope, $uibModal, vehiclesService) {
    $scope.sortingKey = '';
    $scope.descendingSort = false;
    $scope.showFilters = false;

    $scope.brandAndModelFilter = '';
    $scope.showInactive = '';

    $scope.vehicles = null;

    vehiclesService.getVehicles();

    $rootScope.$on('updateVehicles', function (event, vehicles) {
        $scope.vehicles = vehicles;
    });

    $scope.addVehicle = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/VehicleModal.html',
            controller: 'addVehicleController',
            backdrop: 'static'
        });
    };

    $scope.editVehicle = function (idx) {
        $uibModal.open({
            templateUrl: 'Views/Modals/VehicleModal.html',
            controller: 'editVehicleController',
            backdrop: 'static',
            resolve: {
                editedVehicle: function () {
                    return $scope.vehicles[idx];
                }
            }
        });
    };

});