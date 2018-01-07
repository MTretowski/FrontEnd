app.controller('editDriverController', function ($uibModalInstance, $scope, editedDriver, lastNameValidator, firstNameValidator, driversService, inputService) {
    $scope.title = 'Edytuj kierowcę';
    $scope.acceptButtonTitle = 'Zapisz zmiany';

    $scope.firstName = editedDriver.firstName;
    $scope.lastName = editedDriver.lastName;
    $scope.active = editedDriver.active;

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.accept = function () {
        let error = checkDataCorrectness();

        if (error === '') {
            driversService.editDriver(editedDriver.id, $scope.firstName, $scope.lastName, $scope.active);
            $uibModalInstance.dismiss('cancel');
        }
        else {
            alert(error);
        }
    };

    let checkDataCorrectness = function () {
        let error = '';

        error += lastNameValidator.checkLastName($scope.lastName);
        if (error === '') {
            $scope.lastName = inputService.deleteSpaces($scope.lastName);
        }

        error += firstNameValidator.checkFirstName($scope.firstName);

        return error;
    }

});

