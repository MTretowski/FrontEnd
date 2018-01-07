app.service('measurmentRESTService', function ($rootScope, $http) {

    this.getMeasurments = function () {
        $http.get('http://localhost:8080/measurments').then(
            function (response) {
                $rootScope.$broadcast('gotMeasurmentsFromDatabase', response.data);
            });
    };

    this.addMeasurment = function (data) {
        $http.post('http://localhost:8080/measurment/add', data).then(
            function (response) {
                $rootScope.$broadcast('gotMeasurmentsFromDatabase', response.data);
            });
    };

    this.editMeasurment = function (data) {
        $http.put('http://localhost:8080/measurment/update', data).then(
            function (response) {
                $rootScope.$broadcast('gotMeasurmentsFromDatabase', response.data);
            });
    };

    this.deleteMeasurment = function (idx) {
        $http.delete('http://localhost:8080/measurment/delete/' + idx).then(
            function (response) {
                $rootScope.$broadcast('gotMeasurmentsFromDatabase', response.data);
            });
    };
});