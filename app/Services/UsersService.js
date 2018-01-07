app.service('usersService', function ($rootScope, userRESTService) {

    this.getUsers = function () {
        userRESTService.getUsers();
    };

    $rootScope.$on('gotUsersFromDatabase', function (event, users) {
        $rootScope.$broadcast('updateUsers', users);
    });

    this.addUser = function (firstName, lastName, username, password, active, userRoleId) {
        userRESTService.addUser(
            {
                'firstName': firstName,
                'lastName': lastName,
                'username': username,
                'password': password,
                'active': active,
                'userRoleId': userRoleId
            }
        )
    };

    this.editUser = function (id, firstName, lastName, username, active, userRoleId) {
        userRESTService.editUser(
            {
                'id': id,
                'firstName': firstName,
                'lastName': lastName,
                'username': username,
                'active': active,
                'userRoleId': userRoleId
            }
        )
    };

    this.resetPassword = function (userId, newPassword){
        userRESTService.resetPassword(
            {
                'userId': userId,
                'newPassword': newPassword
            }
        )
    };

    this.editPassword = function (userId, oldPassword, newPassword){
        userRESTService.editPassword(
            {
                'userId': userId,
                'oldPassword': oldPassword,
                'newPassword': newPassword,

            }
        )
    };

});