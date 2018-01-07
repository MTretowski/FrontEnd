app.controller('editUserController', function ($uibModalInstance, $uibModal, $scope, editedUser, usersService, inputService, inputValidator, firstNameValidator, lastNameValidator) {
    $scope.title = 'Edytuj użytkownika';
    $scope.acceptButtonTitle = 'Zapisz zmiany';
    $scope.editMode = true;

    $scope.firstName = editedUser.firstName;
    $scope.lastName = editedUser.lastName;
    $scope.username = editedUser.username;
    $scope.userRoleId = editedUser.userRoleId.toString();
    $scope.active = editedUser.active;

    $scope.resetujHaslo = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/PasswordModal.html',
            controller: 'resetPasswordController',
            backdrop: 'static',
            size: 'sm',
            resolve: {
                userId: function () {
                    return editedUser.id;
                },
            }
        });
    };

    $scope.accept = function () {
        let error = checkDataCorrectness();

        if(error === ''){
            usersService.editUser(editedUser.id, $scope.firstName, $scope.lastName, $scope.username, $scope.active, $scope.userRoleId);
        }
        else{
            alert(error);
        }

    };

    let checkDataCorrectness = function () {
        let error = '';

        error += lastNameValidator.checkLastName($scope.lastName);
        if(error === ''){
            $scope.lastName = inputService.deleteSpaces($scope.lastName);
        }

        error += firstNameValidator.checkFirstName($scope.firstName);
        error += inputValidator.checkTextInput($scope.username, 'Login');

        if($scope.userRole === ''){
            error += 'Nie wybrano roli użykownika.\n';
        }

        return error;
    };

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

});