app.service('fuellingRESTService', function ($rootScope, $http) {

    this.getFuellings = function () {
        $http.get('http://localhost:8080/fuellings').then(
            function (response) {
                $rootScope.$broadcast('gotFuellingsFromDatabase', response.data);
            });
    };

    this.addFuelling = function (data) {
        $http.post('http://localhost:8080/fuelling/add', data).then(
            function (response) {
                $rootScope.$broadcast('gotFuellingsFromDatabase', response.data);
            }
        )
    };

    this.editFuelling = function (data) {
        $http.put('http://localhost:8080/fuelling/update', data).then(
            function (response) {
                $rootScope.$broadcast('gotFuellingsFromDatabase', response.data);
            }
        )
    };

    this.deleteFuelling = function (id) {
        $http.delete('http://localhost:8080/fuelling/delete/' + id).then(
            function (response) {
                $rootScope.$broadcast('gotFuellingsFromDatabase', response.data);
            }
        )
    };

    this.importFuellings = function (data) {
        $http.post('http://localhost:8080/fuelling/import', data).then(
            function (response) {
                $rootScope.$broadcast('gotFuellingsFromDatabase', response.data[2]);
                $rootScope.$broadcast('gotImportSummary', response.data[0], response.data[1]);
            }
        )
    };

});