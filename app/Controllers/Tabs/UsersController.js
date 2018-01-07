app.controller('usersController', function ($rootScope, $scope, $uibModal, usersService) {
    $scope.sortingKey = '';
    $scope.descendingSort = false;
    $scope.showFilters = false;

    $scope.showInactiveFilter = false;

    $scope.users = null;

    usersService.getUsers();

    $rootScope.$on('updateUsers', function (event, users) {
        $scope.users = users
    });

    $scope.addUser = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/UserModal.html',
            controller: 'addUserController',
            backdrop: 'static'
        });
    };

    $scope.editUser = function (idx) {
        $uibModal.open({
            templateUrl: 'Views/Modals/UserModal.html',
            controller: 'editUserController',
            backdrop: 'static',
            resolve: {
                editedUser: function () {
                    return $scope.users[idx]
                }
            }
        });
    };

});