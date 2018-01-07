app.service('driverRESTService', function ($rootScope, $http) {

    this.getDrivers = function () {
        $http.get('http://localhost:8080/drivers').then(
            function (response) {
                $rootScope.$broadcast("gotDriversFromDatabase", response.data);
            });
    };

    this.addDriver = function (data) {
        $http.post('http://localhost:8080/driver/add', data).then(
            function (response) {
                $rootScope.$broadcast("gotDriversFromDatabase", response.data);
            },
            function (response) {
                alert("blad " + response.status);
            })
    };

    this.editDriver = function (data) {
        $http.put('http://localhost:8080/driver/update', data).then(
            function (response) {
                $rootScope.$broadcast("gotDriversFromDatabase", response.data);
            },
            function (response) {
                alert("blad " + response.status);
            })
    }

});