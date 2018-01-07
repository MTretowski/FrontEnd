app.controller('driversController', function ($rootScope, $scope, $uibModal, driversService) {
    $scope.sortingKey = '';
    $scope.descendingSort = false;
    $scope.showFilters = false;

    $scope.firstNameFilter = '';
    $scope.lastNameFilter = '';
    $scope.showInactiveFilter = false;

    $scope.drivers = null;

    driversService.getDrivers();

    $rootScope.$on('updateDrivers', function (event, drivers) {
        $scope.drivers = drivers;
    });

    $scope.addDriver = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/DriverModal.html',
            controller: 'addDriverController',
            backdrop: 'static'
        });
    };

    $scope.editDriver = function (idx) {
        $uibModal.open({
            templateUrl: 'Views/Modals/DriverModal.html',
            controller: 'editDriverController',
            backdrop: 'static',
            resolve: {
                editedDriver: function () {
                    return $scope.drivers[idx];
                }
            }
        });
    };

});