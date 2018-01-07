app.service('vehicleRESTService', function ($rootScope, $http) {

    this.getVehicles = function () {
        $http.get('http://localhost:8080/vehicles').then(
            function (response) {
                $rootScope.$broadcast("gotVehiclesFromDatabase", response.data);
            });
    };

    this.addVehicle = function (data) {
        $http.post('http://localhost:8080/vehicle/add', data).then(
            function (response) {
                $rootScope.$broadcast("gotVehiclesFromDatabase", response.data);
            });
    };

    this.editVehicle = function (data) {
        $http.put('http://localhost:8080/vehicle/update', data).then(
            function (response) {
                $rootScope.$broadcast("gotVehiclesFromDatabase", response.data);
            });
    };

});