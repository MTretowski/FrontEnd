app.controller('addVehicleController', function ($uibModalInstance, $scope, inputService, vehiclesService, plateNumbersValidator, inputValidator) {
    $scope.title = 'Dodaj pojazd';
    $scope.acceptButtonTitle = 'Dodaj';

    $scope.plateNumbers = null;
    $scope.brandAndModel = null;
    $scope.leftTankConverter = null;
    $scope.rightTankConverter = null;
    $scope.leftTankCapacity = null;
    $scope.rightTankCapacity = null;
    $scope.active = true;

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.accept = function () {

        let error = checkDataCorrectness();

        if(error === '') {
            $scope.plateNumbers = inputService.deleteSpaces($scope.plateNumbers);

            let plateNumbersCorrectness = plateNumbersValidator.checkPlateNumbers($scope.plateNumbers);
            if (plateNumbersCorrectness !== '') {
                let confirmAlert = confirm(plateNumbersCorrectness + '\nCzy kontynuować?');
                if (confirmAlert === true) {
                    addVehicle();
                } else {

                }
            }
            else{
                addVehicle()
            }
        }
        else{
            alert('Znaleziono błędy:\n' + error);
        }
    };

    let checkDataCorrectness = function(){
        let error = '';

        error += inputValidator.checkTextInput($scope.plateNumbers, 'Numer rejestracyjny');
        error += inputValidator.checkTextInput($scope.brandAndModel, 'Marka i model');

        return error;
    };

    let addVehicle = function(){
        vehiclesService.addVehicle($scope.plateNumbers, $scope.brandAndModel, $scope.leftTankConverter,
            $scope.rightTankConverter, $scope.leftTankCapacity, $scope.rightTankCapacity, $scope.active);
        $uibModalInstance.dismiss('cancel');
    }

});