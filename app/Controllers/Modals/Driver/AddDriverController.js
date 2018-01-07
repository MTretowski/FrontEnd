app.controller('addDriverController', function ($uibModalInstance, $scope, lastNameValidator, firstNameValidator, inputService, driversService) {
    $scope.title = 'Dodaj kierowcę';
    $scope.acceptButtonTitle = 'Dodaj';
    $scope.active = true;

    $scope.firstName = null;
    $scope.lastName = null;

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.accept = function () {
        let error = checkDataCorrectness();

        if (error === '') {
            driversService.addDriver($scope.firstName, $scope.lastName, $scope.active);
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

