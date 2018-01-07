app.service('tripsService', function ($rootScope, tripRESTService) {

    this.getTrips = function () {
        tripRESTService.getTrips();
    };

    $rootScope.$on('gotTripsFromDatabase', function (event, trips) {
        for (let i = trips.length - 1; i >= 0; i--) {
            trips[i].startDate = new Date(trips[i].startDate);
            trips[i].endDate = new Date(trips[i].endDate);
        }
        $rootScope.$broadcast('updateTrips', trips);
    });

    this.addTrip = function (businessTripNumber, startDate, endDate, distance, usedFuelCan, usedFuelWebasto, fuelConsumptionByGps, realFuelConsumption,
                             comment, vehicleId, driverId, startingMeasurmentId, endingMeasurmentId) {

        tripRESTService.addTrip(
            {
                'businessTripNumber': businessTripNumber,
                'startDate': startDate,
                'endDate': endDate,
                'distance': distance,
                'usedFuelCan': usedFuelCan,
                'usedFuelWebasto': usedFuelWebasto,
                'fuelConsumptionByGps': fuelConsumptionByGps,
                'realFuelConsumption': realFuelConsumption,
                'comment': comment,
                'vehicleId': vehicleId,
                'driverId': driverId,
                'startingMeasurmentId': startingMeasurmentId,
                'endingMeasurmentId': endingMeasurmentId
            })

    };

    this.editTrip = function (id, businessTripNumber, startDate, endDate, distance, usedFuelCan, usedFuelWebasto, fuelConsumptionByGps, realFuelConsumption, comment, vehicleId, driverId, startingMeasurmentId, endingMeasurmentId) {

        tripRESTService.editTrip(
            {
                'id': id,
                'businessTripNumber': businessTripNumber,
                'startDate': startDate,
                'endDate': endDate,
                'distance': distance,
                'usedFuelCan': usedFuelCan,
                'usedFuelWebasto': usedFuelWebasto,
                'fuelConsumptionByGps': fuelConsumptionByGps,
                'realFuelConsumption': realFuelConsumption,
                'comment': comment,
                'vehicleId': vehicleId,
                'driverId': driverId,
                'startingMeasurmentId': startingMeasurmentId,
                'endingMeasurmentId': endingMeasurmentId
            })

    };

    this.deleteTrip = function (id) {
        tripRESTService.deleteTrip(id);
    }

});