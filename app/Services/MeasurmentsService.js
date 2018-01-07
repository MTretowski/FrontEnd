app.service('measurmentsService', function ($rootScope, measurmentRESTService) {

    this.getMeasurments = function () {
        measurmentRESTService.getMeasurments();
    };

    $rootScope.$on('gotMeasurmentsFromDatabase', function (event, measurments) {
        for (let i = measurments.length - 1; i >= 0; i--) {
            measurments[i].date = new Date(measurments[i].date);
        }
        $rootScope.$broadcast('updateMeasurments', measurments)
    });

    this.addMeasurment = function (date, leftFuelTank, rightFuelTank, measurmentWay, vehicleId) {
        let manualMeasurment = false;
        let returnToFull = false;
        let measuredAmount = false;

        if (measurmentWay === "manualMeasurment") {
            manualMeasurment = true;
            returnToFull = false;
            measuredAmount = false;
        }
        else if (measurmentWay === "returnToFull") {
            manualMeasurment = false;
            returnToFull = true;
            measuredAmount = false;
        }
        else if (measurmentWay === "measuredAmount") {
            manualMeasurment = false;
            returnToFull = false;
            measuredAmount = true;
        }
        measurmentRESTService.addMeasurment(
            {
                "date": date,
                "leftFuelTank": leftFuelTank,
                "rightFuelTank": rightFuelTank,
                "manualMeasurment": manualMeasurment,
                "returnToFull": returnToFull,
                "measuredAmount": measuredAmount,
                "vehicleId": vehicleId
            }
        );
    };

    this.editMeasurment = function (id, date, leftFuelTank, rightFuelTank, measurmentWay, vehicleId) {
        let manualMeasurment = false;
        let returnToFull = false;
        let measuredAmount = false;

        if (measurmentWay === "manualMeasurment") {
            manualMeasurment = true;
            returnToFull = false;
            measuredAmount = false;
        }
        else if (measurmentWay === "returnToFull") {
            manualMeasurment = false;
            returnToFull = true;
            measuredAmount = false;
        }
        else if (measurmentWay === "measuredAmount") {
            manualMeasurment = false;
            returnToFull = false;
            measuredAmount = true;
        }
        measurmentRESTService.editMeasurment(
            {
                "id": id,
                "date": date,
                "leftFuelTank": leftFuelTank,
                "rightFuelTank": rightFuelTank,
                "manualMeasurment": manualMeasurment,
                "returnToFull": returnToFull,
                "measuredAmount": measuredAmount,
                "vehicleId": vehicleId
            }
        );
    };

    this.deleteMeasurment = function (idx) {
        measurmentRESTService.deleteMeasurment(idx)
    }

});