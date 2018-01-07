app.controller('addFuellingController', function ($uibModalInstance, $uibModal, $rootScope, $scope, inputValidator, dateValidator, fuellingsService) {

    $scope.title = 'Dodaj tankowanie';
    $scope.acceptButtonTitle = 'Dodaj';
    $scope.editingImported = false;
    let now = new Date();
    let nowUTC = new Date();
    nowUTC.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    nowUTC.setUTCHours(now.getHours(), now.getMinutes(), 0, 0);
    $scope.date = nowUTC;

    $scope.vehicle = null;
    $scope.supplierId = 123;
    $scope.amount = null;
    $scope.grossValue = null;
    $scope.currency = '';

    $scope.selectVehicle = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/SelectVehicleModal.html',
            controller: 'selectVehicleController',
            backdrop: 'static'
        });
    };

    $rootScope.$on('selectedVehicle', function (event, vehicleObject) {
        $scope.vehicle = vehicleObject
    });

    $scope.deleteVehicle = function () {
        $scope.vehicle = null;
    };

    $scope.accept = function () {
        let error = checkDataCorrectness();

        if (error === '') {
            fuellingsService.addFuelling($scope.amount, $scope.grossValue, $scope.currency, $scope.date, $scope.supplierId, $scope.vehicle.id);
            $uibModalInstance.dismiss('cancel');
        }
        else {
            alert(error);
        }
    };

    let checkDataCorrectness = function () {
        let error = '';

        error += inputValidator.checkDateInput($scope.date, 'Data tankowania');
        if (error === '') {
            error += dateValidator.isDateFromTheFuture($scope.date, 'Data tankowania');
        }
        error += inputValidator.checkTextInput($scope.vehicle, 'Pojazd');
        error += inputValidator.checkNumericInput($scope.amount, true, 'Ilość');
        error += inputValidator.checkNumericInput($scope.grossValue, true, 'Kwota');
        if ($scope.currency === '') {
            error += "Nie wybrano waluty.\n";
        }
        if ($scope.supplier === '') {
            error += "Nie wybrano dostawcy.\n";
        }

        return error;
    };

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

});