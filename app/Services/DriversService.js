app.service('driversService', function ($rootScope, driverRESTService) {

    this.getDrivers = function () {
        driverRESTService.getDrivers();
    };

    $rootScope.$on('gotDriversFromDatabase', function (event, drivers) {
        $rootScope.$broadcast('updateDrivers', drivers);
    });

    this.addDriver = function (firstName, lastName, active) {
        driverRESTService.addDriver(
            {
                "firstName": firstName,
                "lastName": lastName,
                "active": active
            }
        )
    };

    this.editDriver = function (id, firstName, lastName, active) {
        driverRESTService.editDriver(
            {
                "id": id,
                "firstName": firstName,
                "lastName": lastName,
                "active": active
            }
        )
    }

});