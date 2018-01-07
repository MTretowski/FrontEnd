app.service('userRESTService', function ($rootScope, $http) {

    this.getUsers = function () {
        $http.get('http://localhost:8080/users').then(
            function (response) {
                $rootScope.$broadcast('gotUsersFromDatabase', response.data);
            });
    };

    this.addUser = function (data) {
        $http.post('http://localhost:8080/user/add', data).then(
            function (response) {
                $rootScope.$broadcast('gotUsersFromDatabase', response.data)
            });
    };

    this.editUser = function (data) {
        $http.put('http://localhost:8080/user/update', data).then(
            function (response) {
                $rootScope.$broadcast('gotUsersFromDatabase', response.data)
            });
    };

    this.resetPassword = function (data) {
        $http.put('http://localhost:8080/user/resetPassword', data).then(
            function (response) {
                $rootScope.$broadcast('gotUsersFromDatabase', response.data)
            }
        )
    };

    this.editPassword = function (data) {
        $http.put('http://localhost:8080/user/updatePassword', data).then(
            function (response) {
                $rootScope.$broadcast('gotUsersFromDatabase', response.data)
            }
        )
    };

});