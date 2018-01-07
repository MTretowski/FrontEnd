app.service('tripRESTService', function ($rootScope, $http) {

    this.getTrips = function () {
        $http.get('http://localhost:8080/trips').then(
            function (response) {
                $rootScope.$broadcast("gotTripsFromDatabase", response.data);
            });
    };

    this.addTrip = function (data) {
        $http.post('http://localhost:8080/trip/add', data).then(
            function (response) {
                $rootScope.$broadcast('gotTripsFromDatabase', response.data);
            }
        )
    };

    this.editTrip = function (data) {
        $http.put('http://localhost:8080/trip/update', data).then(
            function (response) {
                $rootScope.$broadcast('gotTripsFromDatabase', response.data);
            }
        )
    };

    this.deleteTrip = function (id) {
        $http.delete('http://localhost:8080/trip/delete/' + id).then(
            function (response) {
                $rootScope.$broadcast('gotTripsFromDatabase', response.data);
            }
        )
    };

});