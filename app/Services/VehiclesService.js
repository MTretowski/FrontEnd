app.service('vehiclesService', function ($rootScope, vehicleRESTService) {

    this.getVehicles = function () {
        vehicleRESTService.getVehicles();
    };

    $rootScope.$on('gotVehiclesFromDatabase', function (event, vehicles) {
        $rootScope.$broadcast('updateVehicles', vehicles);
    });

    this.addVehicle = function (plateNumbers, brandAndModel, leftTankConverter, rightTankConverter, leftTankCapacity, rightTankCapacity, active) {
        vehicleRESTService.addVehicle(
            {
                'plateNumbers': plateNumbers,
                'brandAndModel': brandAndModel,
                'leftTankConverter': leftTankConverter,
                'rightTankConverter': rightTankConverter,
                'leftTankCapacity': leftTankCapacity,
                'rightTankCapacity': rightTankCapacity,
                'active': active
            })
    };

    this.editVehicle = function (id, plateNumbers, brandAndModel, leftTankConverter, rightTankConverter, leftTankCapacity, rightTankCapacity, active) {
        vehicleRESTService.editVehicle(
            {
                'id': id,
                'plateNumbers': plateNumbers,
                'brandAndModel': brandAndModel,
                'leftTankConverter': leftTankConverter,
                'rightTankConverter': rightTankConverter,
                'leftTankCapacity': leftTankCapacity,
                'rightTankCapacity': rightTankCapacity,
                'active': active
            })
    }
});