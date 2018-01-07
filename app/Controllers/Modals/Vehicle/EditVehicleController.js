app.controller('editVehicleController', function ($uibModalInstance, $scope, editedVehicle, vehiclesService, inputService, inputValidator, plateNumbersValidator) {
    $scope.title = 'Edytuj pojazd';
    $scope.acceptButtonTitle = 'Zapisz zmiany';

    $scope.plateNumbers = editedVehicle.plateNumbers;
    $scope.brandAndModel = editedVehicle.brandAndModel;
    $scope.leftTankConverter = editedVehicle.leftTankConverter;
    $scope.rightTankConverter = editedVehicle.rightTankConverter;
    $scope.leftTankCapacity = editedVehicle.leftTankCapacity;
    $scope.rightTankCapacity = editedVehicle.rightTankCapacity;
    $scope.active = editedVehicle.active;

    $scope.accept = function () {

        let error = checkDataCorrectness();

        if (error === '') {
            $scope.plateNumbers = inputService.deleteSpaces($scope.plateNumbers);

            let plateNumbersCorrectness = plateNumbersValidator.checkPlateNumbers($scope.plateNumbers);
            if (plateNumbersCorrectness !== '') {
                let confirmAlert = confirm(plateNumbersCorrectness + '\nCzy kontynuować?');
                if (confirmAlert === true) {
                    editVehicle()
                } else {
                }
            }
            else {
                editVehicle()
            }
        }
        else {
            alert('Znaleziono błędy:\n' + error);
        }
    };

    let checkDataCorrectness = function () {
        let error = '';

        error += inputValidator.checkTextInput($scope.plateNumbers, 'Numer rejestracyjny');
        error += inputValidator.checkTextInput($scope.brandAndModel, 'Marka i model');

        return error;

    };

    let editVehicle = function () {
        vehiclesService.editVehicle(editedVehicle.id, $scope.plateNumbers, $scope.brandAndModel, $scope.leftTankConverter,
            $scope.rightTankConverter, $scope.leftTankCapacity, $scope.rightTankCapacity, $scope.active);
        $uibModalInstance.dismiss('cancel');
    };

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

});