app.controller('selectVehicleController', function ($uibModalInstance, $uibModal, $rootScope, $scope, vehiclesService) {

    $scope.vehicles = null;

    vehiclesService.getVehicles();

    $rootScope.$on('updateVehicles', function(event, vehicles){
        $scope.vehicles = vehicles;
    });

    $scope.selected = function (numerPojazdu){
        $rootScope.$broadcast('selectedVehicle', $scope.vehicles[numerPojazdu]);
        $uibModalInstance.dismiss('cancel');
    };

    $scope.addVehicle = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/VehicleModal.html',
            controller: 'addVehicleController',
            backdrop  : 'static'
        });
    };

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

});