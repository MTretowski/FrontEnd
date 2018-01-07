app.controller('selectMeasurmentController', function ($uibModalInstance, $rootScope, $scope, measurmentType, vehicleId, measurmentsService) {

    $scope.measurments = null;
    $scope.vehicleId = vehicleId;
    $scope.measurmentType = measurmentType;

    measurmentsService.getMeasurments();

    let now = new Date();
    let nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    let oneYearAgo = new Date(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    nowUTC.setUTCHours(23, 59, 59);
    oneYearAgo.setUTCHours(0, 0, 0);
    $scope.dateFromFilter = oneYearAgo;
    $scope.dateToFilter = nowUTC;

    $rootScope.$on('updateMeasurments', function (event, measurments) {
        $scope.measurments = measurments;
    });

    $scope.selected = function (measurmentNumber) {
        $rootScope.$broadcast('selectedMeasurment', measurmentType, $scope.measurments[measurmentNumber].id, $scope.measurments[measurmentNumber].date, $scope.measurments[measurmentNumber].leftFuelTankAmount + $scope.measurments[measurmentNumber].rightFuelTankAmount);
        $uibModalInstance.dismiss('cancel');
    };

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

});