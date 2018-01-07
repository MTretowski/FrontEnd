app.controller('addUserController', function ($uibModalInstance, $scope, inputService, usersService, firstNameValidator, lastNameValidator, inputValidator) {
    $scope.title = 'Dodaj użytkownika';
    $scope.acceptButtonTitle = 'Dodaj';
    $scope.editMode = false;

    $scope.firstName = null;
    $scope.lastName = null;
    $scope.username = null;
    $scope.password = null;
    $scope.userRoleId = null;
    $scope.active = true;

    $scope.accept = function () {
        let error = checkDataCorrectness();

        if(error === ''){
            usersService.addUser($scope.firstName, $scope.lastName, $scope.username, $scope.password, $scope.active, $scope.userRoleId)
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
        error += inputValidator.checkTextInput($scope.password, 'Hasło');
        
        if($scope.userRole === ''){
            error += 'Nie wybrano roli użykownika.\n';
        }
        
        return error;
    };

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

});