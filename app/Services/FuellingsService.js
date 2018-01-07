app.service('fuellingsService', function ($rootScope, fuellingRESTService) {

    this.getFuellings = function () {
        fuellingRESTService.getFuellings();
    };

    $rootScope.$on('gotFuellingsFromDatabase', function (event, fuellings) {
        for (let i = fuellings.length - 1; i >= 0; i--) {
            fuellings[i].date = new Date(fuellings[i].date);
        }
        $rootScope.$broadcast('updateFuellings', fuellings);
    });

    $rootScope.$on('gotImportSummary', function (event, succesfullyImported, notImported) {
        $rootScope.$broadcast('showImportSummary', succesfullyImported, notImported);
    });

    this.addFuelling = function (amount, grossValue, currency, date, supplierId, vehicleId) {
        fuellingRESTService.addFuelling(
            {
                'amount': amount,
                'grossValue': grossValue,
                'currency': currency,
                'date': date,
                'supplierId': supplierId,
                'vehicleId': vehicleId
            }
        )
    };

    this.editFuelling = function (id, amount, grossValue, currency, date, supplierId, vehicleId) {
        fuellingRESTService.editFuelling(
            {
                'id': id,
                'amount': amount,
                'grossValue': grossValue,
                'currency': currency,
                'date': date,
                'supplierId': supplierId,
                'vehicleId': vehicleId
            }
        )
    };

    this.deleteFuelling = function (id) {
        fuellingRESTService.deleteFuelling(id)
    };

    this.importFuellings = function (data) {
        fuellingRESTService.importFuellings(data);
    }
});