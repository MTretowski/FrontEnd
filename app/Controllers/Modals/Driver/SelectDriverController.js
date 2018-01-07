app.controller('selectDriverController', function ($uibModalInstance, $rootScope, $scope, driversService) {

    $scope.drivers = null;

    driversService.getDrivers();

    $scope.selected = function (idx) {
        $rootScope.$broadcast('selectedDriver', $scope.drivers[idx]);
        $uibModalInstance.dismiss('cancel');
    };

    $rootScope.$on('updateDrivers', function (event, drivers) {
        $scope.drivers = drivers;
    });

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

});